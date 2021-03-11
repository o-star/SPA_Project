arg <- commandArgs()
library(randomForest)
folder <- getwd()
simulation_name <- arg[6]
input_file_path <- arg[7]

model_file_path <- paste0(folder, "/models/", simulation_name, '/')
minimum_runtime = 2
pre_processing_func <- 4

# source(paste0(folder, "/pre_proc_func.R"), echo=TRUE)
# source(paste0(folder, "/ml_func.R"), echo=TRUE)

source(paste0(folder, "/pre_proc_func.R"))
source(paste0(folder, "/ml_func.R"))

predict_runtime <- function(parameter){
  info_data <- readRDS(paste0(model_file_path, "info.rds"))
  model.k <- info_data[1]
  cut <- info_data[2]
  order <- info_data[3:6]
  order_length <- 0
  for(i in 1:pre_processing_func){
    if(order[i] == 0){
      order_length <- i - 1
      break
    }
  }
  if(order_length != 0){
    for(i in 1:order_length){
      if(order[i] == 3){
        max_arr <<- readRDS(paste0(model_file_path, "norMax.rds"))
        min_arr <<- readRDS(paste0(model_file_path, "norMin.rds"))
        parameter <- normalization_func(parameter, 1, length(parameter))
      } else if(order[i] == 4){
        model.pca <<- readRDS(paste0(model_file_path, "pca.rds"))
        result.pca <- predict(model.pca, parameter)
        t <- as.data.frame(matrix(0, nrow=1, ncol=cut))
        colnames(t) <- c(colnames(result.pca)[1:cut])
        for(i in 1:cut){
          t[1, i] <- result.pca[, i]
        }
        parameter <- t
      }
    }
  }
  if(model.k == 1){
    model.reg <- readRDS(paste0(model_file_path, "reg.rds"))
    return(predict(model.reg, parameter))
  } else{
    model.cls <- readRDS(paste0(model_file_path, "cls.rds"))
    k <- predict(model.cls, parameter)
    model.temp <- readRDS(paste0(model_file_path, "curg", k, ".rds"))
    if(mode(model.temp) == "numeric"){
      if(model.temp > 0){
        return(as.numeric(model.temp))
      }
    } else{
      return(predict(model.temp, parameter))
    }
  }
}
idata <- read_file(input_file_path)[1,]

print(paste("predicted:", predict_runtime(idata[, 2:length(idata)])))