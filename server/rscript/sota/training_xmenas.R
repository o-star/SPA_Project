arg <- commandArgs()

# devtools::install_github("collectivemedia/tictoc")

library(dplyr)
library(randomForest)
library(tictoc)

library("RWeka") # requires Java SE Runtime
WPM("refresh-cache") # Build Weka package metadata cache
WPM("install-package", "XMeans") # Install XMeans package if not previously installed

folder <- paste0(getwd(), "/..")
simulation_name <- arg[6]
input_file_path <- arg[7]

dir.create(paste0(folder, "/models"))
dir.create(paste0(folder, "/models/temp"))
dir.create(paste0(folder, "/models/", simulation_name))

temp_model_file_path <- paste0(folder, "/models/temp/")
model_file_path <- paste0(folder, "/models/", simulation_name, '/')

kfold <- 5
number_of_samples <- 13
sample_mul <- 1.6
find_range <- 10
max_range <- 100
min_range <- 2

pre_index_list <- c(1, 18, 2, 34, 50, 19, 24, 29, 8, 13, 45)

pre_processing_func <- 4
minimun_number_of_data_in_cluster <- 6
sd_const_value = 0.01
outlier_cut_percent = 95
outlier_cut_value = 1
outlier_minimun_row = 10
ml_outlier_cut_value = 5
minimum_runtime = 2

set.seed(1234)

source(paste0(folder, "/pre_proc_func.R"), echo=TRUE)
source(paste0(folder, "/ml_func.R"), echo=TRUE)
source(paste0(folder, "/make_df.R"), echo=TRUE)
source(paste0(folder, "/find_k.R"), echo=TRUE)
source(paste0(folder, "/sota/calc_err_xmeans.R"), echo=TRUE)

result_length <- max_range*2+10
final_result <- 0

scenario <- function(order, order_length, order_index){
  final_result <<- as.data.frame(array(Inf, c(kfold+1, result_length)))
  
  model_files <- list.files(temp_model_file_path, pattern="*.*", full.names = TRUE)
  file.remove(model_files)
  
  tic()
  make_df(input_file_path, order, order_length)

  for(kf in 1:kfold){
    cat("*")
    training_func(as.data.frame(list.training_df[kf]), as.data.frame(list.testing_df[kf]), kf)
  }
  
  for(kf in 1:result_length){
    final_result[kfold+1, kf] <- mean(final_result[1:kfold, kf])
  }
  rt <- toc()
  
  final_result[kfold+1, 1] <- as.numeric(rt[2])-as.numeric(rt[1])
  
  return(final_result[kfold+1,])
}

run_scenario <- function(order, visit, order_length)
{
  index <<- index + 1
  order_list[index, ] <<- order
  
  check_permutation <- 0
  for(k in 1:length(pre_index_list)){
    if(index == pre_index_list[k])
      check_permutation <- 1
  }
  
  # if(order[2] != 4) check_permutation <- 0
  
  if(check_permutation == 1){
    print(order)
    final_result_all[index, ] <<- scenario(order, order_length, index)
  }
  
  for(i in 1:pre_processing_func){
    if(!visit[i]){
      visit[i]<-TRUE
      order[order_length + 1] <- i
      run_scenario(order, visit, order_length + 1)
      visit[i]<-FALSE
    }
  }
}

final_result_all <- as.data.frame(array(0, c(65, result_length)))
colnames(final_result_all) <- c("time", "rg_s")
order_list <- as.data.frame(array(0, c(11, pre_processing_func)))

od <- array(0, c(pre_processing_func))
vt <- array(FALSE, c(pre_processing_func))
run_scenario(od, vt, 0)

final <- final_result_all[, 1:4]
colnames(final) <- c("training time", "random forest error", "best k", "clutch error")

write.csv(final, paste0(simulation_name, "_result.csv"))
