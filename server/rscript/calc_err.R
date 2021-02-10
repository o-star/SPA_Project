index <- 0
max_arr <- 0
min_arr <- 0
cut <- 0
model.reg <- 0
model.curg.kmeans <- 0
model.curg.reg <- 0
model.pca <- 0

training_func <- function(training_data, testing_data, count, optK){
  training_data.ncol <- length(training_data)

  #training
  # regression
  model.reg <- learning_one_model(training_data, "runtime", "random_forest")
  result.reg <- predict_one_model(testing_data, "reg", "runtime", model.reg)
  saveRDS(model.reg, paste0(temp_model_file_path, "reg.rds"))
  
  final_result[count, 2] <<- result.reg[1]

  # clustering + regression
  # curg : clustering
  
  st <- optK - find_range
  ed <- st + (find_range*2-1)
  if(st < min_range){
    st <- min_range
    ed <- st + (find_range*2-1)
  }
  if(optK == -1){
    st <- min_range
    ed <- max_range
  }
  index_cnt <- 0
  
  for(i in st:ed){
    index_cnt <- index_cnt + 1
    final_result[count, 2+index_cnt] <<- i
  
    check <- 0
    tryCatch(model.curg.kmeans <- kmeans(training_data, centers = i),
             error = function(e) check <<- 1)
    if(check == 1){
      break
    }

    tr.ctemp <- as.data.frame(model.curg.kmeans$cluster)
    colnames(tr.ctemp) <- c("cl")

    tr.temp <- cbind(training_data, tr.ctemp)
    tr.temp$cl <- as.factor(tr.temp$cl)
    tr.temp <- tr.temp[, 2:length(tr.temp)]

    rf_model <- randomForest(cl~., data = tr.temp,
                             ntree=10, mtry=length(tr.temp)-2, na.action=na.omit, importance=T)
    saveRDS(rf_model, paste0(temp_model_file_path,"cls.rds"))

    result.curg.kmeans <- predict(rf_model, testing_data)

    # curg : regression
    hybrid_training(training_data, i, model.curg.kmeans$cluster, "random_forest", "runtime")
    result.curg.reg <- hybrid_testing(testing_data, i, result.curg.kmeans, "runtime")

    final_result[count, 2+max_range+index_cnt] <<- result.curg.reg
  }
}
