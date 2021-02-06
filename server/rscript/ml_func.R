
hybrid_training <- function(train_clas, div_number, clas_result, mn, target) {
  st <- 1
  ed <- div_number
  
  clas_result <- as.data.frame(clas_result)
  colnames(clas_result) = c("clas_result")
  clas_result$clas_result <- factor(clas_result$clas_result, c(st:ed))
  
  train_clas<-cbind(train_clas, clas_result)
  
  for(i in st:ed){
    now_train <- subset(train_clas, clas_result == i)
    if(nrow(now_train) > 5){
      model.temp <- learning_one_model(now_train[-length(now_train)], target, mn)
      saveRDS(model.temp, paste0(temp_model_file_path, "curg", i, ".rds"))
    }
    else if(nrow(now_train) > 0) {
      saveRDS(median(now_train[[target]]), paste0(temp_model_file_path, "curg", i, ".rds"))
    }
    else{
      saveRDS(median(train_clas[[target]]), paste0(temp_model_file_path, "curg", i, ".rds"))
    }
  }
}

hybrid_testing <- function(test_clas, div_number, clas_result, target){
  st <- 1
  ed <- div_number

  
  clas_result <- as.data.frame(clas_result)
  colnames(clas_result) = c("clas_result")
  clas_result$clas_result <- factor(clas_result$clas_result, c(st:ed))
  
  test_clas<-cbind(test_clas, clas_result)
  
  result.data <- data.frame(matrix(nrow=0, ncol=3))
  colnames(result.data) <- c("arr", "arr1", "arr2")
  
  for(i in st:ed){
    model.temp <- readRDS(paste0(temp_model_file_path, "curg", i, ".rds"))
    now_test <- subset(test_clas, clas_result == i)
    
    if(nrow(now_test) > 0){
      if(mode(model.temp) == "numeric"){
        if(model.temp > 0){
          result.temp <- data_checking_func(array(model.temp, c(nrow(now_test))), now_test[-length(now_test)], "hybrid", target)
          result.data <- rbind(as.data.frame(result.data), as.data.frame(result.temp))
        }
      }
      else{
        result.temp <- predict_one_model(now_test[-length(now_test)], "hybrid", target, model.temp)
        result.data <- rbind(as.data.frame(result.data), as.data.frame(result.temp))
      }
    }
  }
  
  r_row <- nrow(result.data)
  arr <- as.data.frame(result.data[, 1])
  colnames(arr) <- c("arr")
  
  if(nrow(arr) >= outlier_minimun_row){
    arr <- delete_outlier(arr, r_row, "arr", ml_outlier_cut_value)
  }
  
  ret <- round(mean(arr[, 1]), 2)
  return (ret)
}

data_checking_func <- function(temp_prediction, temp_test, model_mode, model_target)
{
  ret <- c(0, 0)
  temp_row <- nrow(temp_test)
  arr <- array(0, c(temp_row))
  
  if(model_mode == "reg"){
    temp_prediction <- as.numeric(temp_prediction)
    temp_df <- cbind(as.data.frame(temp_prediction), temp_test[[model_target]])
    temp_df <- subset(temp_df, temp_df[, 1] >= minimum_runtime)
    temp_row<-nrow(temp_df)
    
    for(i in 1:temp_row){
      arr[i] <- (abs(temp_df[i, 1] - temp_df[i, 2]) / ((temp_df[i, 2]+temp_df[i, 1]) / 2))*100
    }
    arr <- as.data.frame(arr)
    
    if(temp_row >= outlier_minimun_row){
      arr <- delete_outlier(arr, temp_row, "arr", ml_outlier_cut_value)
    }
    
    ret[1] <- round(mean(arr[,1]),3)
    ret[2] <- nrow(arr)
  }
  else if(model_mode == "hybrid"){
    temp_prediction <- as.numeric(temp_prediction)
    temp_df <- cbind(as.data.frame(temp_prediction), temp_test[[model_target]])
    temp_df <- subset(temp_df, temp_df[, 1] >= minimum_runtime)
    temp_row<-nrow(temp_df)
    
    arr <- array(0, c(temp_row))
    for(i in 1:temp_row){
      arr[i] <- (abs(temp_df[i, 1] - temp_df[i, 2]) / ((temp_df[i, 2]+temp_df[i, 1]) / 2))*100
    }
    arr <- as.data.frame(arr)
    
    ret <- arr
  }
  
  return(ret)
}

random_forest_func <- function(rf_train, rf_col, model_formula, add)
{
  rf_model <- randomForest(model_formula, data = rf_train,
                           ntree = 10, mtry = rf_col/2, na.action = na.omit, importance = T)
  return(rf_model)
}

machine_learning_func <- function(ml_train, model_target, ml_func, add)
{
  ml_col <- length(ml_train)
  
  s <- paste(model_target, "~.")
  ml_fomula <- as.formula(s)
  
  ret_model <- 0
  tryCatch(
    ret_model <- ml_func(ml_train, ml_col, ml_fomula, add),
    error = function(e) e
  )
  return(ret_model)
}

learning_one_model <- function(ml_train, model_target, model_name)
{
  error_checking = FALSE
  
  ml_func <- 0
  add <- 0
  if(model_name == "random_forest"){
    ml_func = random_forest_func
  }
  
  ml_ret <- machine_learning_func(ml_train, model_target, ml_func, add)
  return(ml_ret)
}

predict_one_model <- function(ml_test, model_mode, model_target, ml_model)
{
  ml_row <- nrow(ml_test)
  
  if(model_mode == "hybrid"){
    if(ml_row == 0){
      return(0)
    }
    
    prediction <<- predict(ml_model, ml_test)
    
    agreement <- data_checking_func(prediction, ml_test, model_mode, model_target)
    
    return(agreement)
  }
  else{
    agreement <- c(Inf, Inf, Inf, 0)
    
    if(ml_row == 0){
      return(agreement)
    }
    
    prediction <<- predict(ml_model, ml_test)
    
    agreement <- data_checking_func(prediction, ml_test, model_mode, model_target)
    
    return(agreement)
  }
}