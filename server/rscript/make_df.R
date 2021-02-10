list.training_df <- c()
list.testing_df <- c()

run_pre_processing <- function(order, idx, df, mode)
{
  if(order[idx] == 1 && mode == 1){
    if(length(df)>=3){
      df <- arrange(df, df[[2]], df[[3]])
    }
    else{
      df <- arrange(df, df[[2]])
    }
    df <- overlap_data_refine(df, nrow(df), ncol(df))
  }
  else if(order[idx] == 2 && mode == 1){
    df <- delete_outlier(df, nrow(df), "runtime", outlier_cut_value)
  }
  else if(order[idx] == 3){
    if(mode == 1){
      update_min_max(df, length(df))
      
      saveRDS(max_arr, paste0(temp_model_file_path,"norMax.rds"))
      saveRDS(min_arr, paste0(temp_model_file_path,"norMin.rds"))
    }
    df <- normalization_func(df, 2, length(df))
  }
  else if(order[idx] == 4){
    if(mode == 1){
      model.pca <<- prcomp(df[,-1])
      for(i in 1:length(df)){
        if(as.data.frame(summary(model.pca)[6])[3, i] >= 0.99){
          cut <<- i
          break
        }
      }
      
      t <- as.data.frame(model.pca$x[, 1:cut])
      if(cut == 1){
        colnames(t) <- c("PC1")
      }
      adf <- as.data.frame(df[, 1])
      colnames(adf) <- "runtime"
      df <- cbind(adf, t)
      
      max_arr <<- array(0, c(cut+1))
      min_arr <<- array(0, c(cut+1))
      
      saveRDS(model.pca, paste0(temp_model_file_path,"pca.rds"))
    }
    else{
      result.pca <- predict(model.pca, df[,-1])
      t <- as.data.frame(result.pca[, 1:cut])
      if(cut == 1){
        colnames(t) <- c("PC1")
      }
      adf <- as.data.frame(df[, 1])
      colnames(adf) <- "runtime"
      df <- cbind(adf, t)
    }
  }
  
  return(df)
}

make_df <- function(file_path, order, idx){
  input_df <- read_file(file_path)
  
  for(kf in 1:kfold){
    testD <- get_divide_data(input_df, kf, kfold)
    trainD <- 0
    state = 0
    for(k in 1:kfold){
      if(kf == k){
        next
      }
      if(state == 0){
        state = 1
        trainD <- get_divide_data(input_df, k, kfold)
      }
      else{
        trainD <- rbind(trainD, get_divide_data(input_df, k, kfold))
      }
    }
    
    trainD.ncol <- length(trainD)
    update_min_max(trainD, trainD.ncol)
    
    if(idx != 0){
      for(i in 1:idx){
        trainD <- run_pre_processing(order, i, trainD, 1)
        testD <- run_pre_processing(order, i, testD, 2)
      }
    }
    
    trainD <- na.omit(trainD)
    testD <- na.omit(testD)
    
    list.training_df[kf] <<- list(trainD)
    list.testing_df[kf] <<- list(testD)
  }
}
