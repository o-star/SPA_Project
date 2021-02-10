index <- 0
max_arr <- 0
min_arr <- 0
cut <- 0
model.reg <- 0
model.curg.kmeans <- 0
model.curg.reg <- 0
model.pca <- 0

training_func <- function(training_data, testing_data, count){
  training_data.ncol <- length(training_data)
  
  #training
  # regression
  model.reg <- learning_one_model(training_data, "runtime", "random_forest")
  result.reg <- predict_one_model(testing_data, "reg", "runtime", model.reg)
  saveRDS(model.reg, paste0(temp_model_file_path, "reg.rds"))
  
  final_result[count, 2] <<- result.reg[1]

  # clustering + regression
  # curg : clustering
  
  weka_ctrl <- Weka_control( # Create a Weka control object to specify our parameters
    L = 2,   # min no clusters
    H = 100,   # max no clusters
    D = "weka.core.EuclideanDistance" # distance metric
  )
  model.curg.xmeans <- XMeans(training_data, control = weka_ctrl) # run algorithm on data
  
  if(min(model.curg.xmeans$class_ids) == max(model.curg.xmeans$class_ids)){
    final_result[count, 3] <<- 1
    final_result[count, 4] <<- result.reg[1]
  }
  else{
    tr.ctemp <- as.data.frame(model.curg.xmeans$class_ids+1)
    colnames(tr.ctemp) <- c("cl")
    
    tr.temp <- cbind(training_data, tr.ctemp)
    tr.temp$cl <- as.factor(tr.temp$cl)
    tr.temp <- tr.temp[, 2:length(tr.temp)]
    
    k <- nlevels(tr.temp$cl)
    print(k)
    
    rf_model <- randomForest(cl~., data = tr.temp,
                             ntree=10, mtry=length(tr.temp)-2, na.action=na.omit, importance=T)
    saveRDS(rf_model, paste0(temp_model_file_path,"cls.rds"))
    
    result.curg.xmeans <- predict(rf_model, testing_data)
    
    # curg : regression
    hybrid_training(training_data, k, model.curg.xmeans$class_ids+1, "random_forest", "runtime")
    result.curg.reg <- hybrid_testing(testing_data, k, result.curg.xmeans, "runtime")
    
    final_result[count, 3] <<- k
    final_result[count, 4] <<- result.curg.reg
  }
}
