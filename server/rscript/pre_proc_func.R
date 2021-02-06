overlap_data_refine <- function(df, df.nrow, df.ncol)
{
  ret <- df[1,]
  ret <- ret[-1,]
  visit <- array(0, c(df.nrow))
  new_row <- 0
  
  for(i in 1:df.nrow){
    if(visit[i] == 0){
      visit[i] <- 1
      ret <- rbind(ret, df[i, ])
      num <- 1
      new_row <- new_row + 1
      
      s <- i + 1
      if(s > df.nrow){break}
      for(k in s:df.nrow){
        if(df.ncol >= 3){
          if((ret[new_row, 2] != df[k, 2]) | (ret[new_row, 3] != df[k, 3])){
            break
          }
        }
        else{
          if((ret[new_row, 2] != df[k, 2])){
            break
          }
        }
        
        if(visit[k] == 0){
          if(length(which(ret[new_row, -1] == df[k, -1])) == df.ncol - 1){
            visit[k] <- 1
            num <- num + 1
            ret[new_row, 1] <- ret[new_row, 1] + df[k, 1]
          }
        }
      }
      
      ret[new_row,1] <- floor(ret[new_row,1] / num)
    }
  }
  return(ret)
}

read_file <- function(filename)
{
  ret <- read.table(filename, header=TRUE, sep=",")
  ret <- na.omit(ret)
  
  ret <- subset(ret, runtime >= minimum_runtime)
  ret.ncol <- length(ret)

  for(i in 2:ret.ncol){
    check <- TRUE
    tryCatch(as.numeric(as.character(ret[, i])),
            warning = function(w) check <<- FALSE,
            error = function(e) check <<- FALSE
            )
    if(check){
      ret[, i] <- as.numeric(as.character(ret[, i]))
    }
    else{
      ret[, i] <- as.numeric(as.factor(ret[, i]))
    }
  }

  return(ret)
}

update_min_max<-function(df, df.ncol){
  for(i in 1:df.ncol){
    max_arr[i] <<- max(df[,i])
    min_arr[i] <<- min(df[,i])
  }
}

normalize <-function(x, min_value, max_value){
  return ((x-min_value)/(max_value-min_value))
}

normalization_func <- function(df, st, ed){
  for(i in st:ed){
    if(class(df[1, i]) == "numeric" && min_arr[i] != max_arr[i]){
      df[, i] <- as.numeric(normalize(df[, i], min_arr[i], max_arr[i]))
    }
  }
  
  return(df)
}

get_deleted_data <- function(df, sd_value, target)
{
  df_up <- mean(df[[target]]) + sd_value*sd(df[[target]])
  df_down <- mean(df[[target]]) - sd_value*sd(df[[target]])
  refined_df <- subset(df, df[[target]] >= df_down & df[[target]] <= df_up)
  
  return(refined_df)
}

get_remain_percent <- function(df, number_of_data)
{
  refined_number_of_input_row <- nrow(df)
  remain_data_percent <- refined_number_of_input_row/number_of_data*100
  
  return(remain_data_percent)
}

get_divide_data <- function(df, div, k)
{
  temp <- nrow(df) / k
  st = (div - 1) * temp + 1
  ed = div * temp
  
  return(df[st:ed,])
}

delete_outlier <- function(df, number_of_data, target, cut_value){
  sd_value <- 10
  last_value <- -1
  repeat{
    sd_value <- sd_value - sd_const_value
    
    refined_df <- get_deleted_data(df, sd_value, target)
    remain_data_percent <- get_remain_percent(refined_df, number_of_data)
    
    if((last_value != -1 && last_value - round(remain_data_percent, digit=3) >= cut_value) || remain_data_percent <= outlier_cut_percent){
      sd_value <- sd_value + sd_const_value
      refined_df <- get_deleted_data(df, sd_value, target)
      get_remain_percent <- get_remain_percent(refined_df, number_of_data)
      
      return(refined_df)
    }
    
    last_value <- round(remain_data_percent, digit=3)
  }
}