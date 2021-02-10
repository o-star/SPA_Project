calc_ab <- function(idata, xp){
  n <- nrow(idata)
  
  t <- as.data.frame(matrix(nrow = n, ncol = 3))
  colnames(t) <- c("lnx", "lnx2", "ylnx")
  
  idata <- cbind(idata, t)
  
  idata$x <- idata$x
  idata$lnx <- log(idata$x+xp)
  idata$lnx2 <- idata$lnx * idata$lnx
  idata$ylnx <- idata$lnx * idata$y
  
  sy <- sum(idata$y)
  slnx <- sum(idata$lnx)
  slnx2 <- sum(idata$lnx2)
  sylnx <- sum(idata$ylnx)
  
  a <- slnx2
  b <- slnx
  c <- slnx
  d <- n
  e <- sylnx
  f <- sy
  
  detm <- matrix(nrow = 2, ncol = 2)
  detm[1, 1] <- a
  detm[1, 2] <- b
  detm[2, 1] <- c
  detm[2, 2] <- d
  detA <- det(detm)
  
  detm[1, 1] <- e
  detm[1, 2] <- b
  detm[2, 1] <- f
  detm[2, 2] <- d
  solution1 <- det(detm) / detA
  
  detm[1, 1] <- a
  detm[1, 2] <- e
  detm[2, 1] <- c
  detm[2, 2] <- f
  solution2 <- det(detm) / detA
  
  return(list(solution1, solution2))
}

calc_y <- function(x, a, b, xp){
  return(a*log(x+xp)+b)
}

calc_err <- function(idata, a, b, xp){
  err <- 0
  for(i in 1:nrow(idata)){
    e <- as.numeric(idata$y[i]) - calc_y(floor(idata$x[i]), a, b, xp)
    err <- err + e*e
  }
  
  return(err)
}

find_bestk <- function(idata){
  idata <- na.omit(idata)
  colnames(idata) <- c("x", "y")
  idata$x <- floor(idata$x)
  idata <- subset(idata, y<=200 & x < 900)
  
  findk <- as.data.frame(matrix(nrow = 200, ncol = 5))
  colnames(findk) <- c("err", "a", "b", "c", "d")
  
  ab <- calc_ab(idata, 0)
  findk$a[1] <- as.numeric(ab[1])
  findk$b[1] <- as.numeric(ab[2])
  findk$err[1] <- calc_err(idata, findk$a[1], findk$b[1], 0)
  
  limit <- nrow(idata) - 2
  
  for(i in 2:limit){
    tdata <- idata[1:i, ]
    ab <- calc_ab(tdata, 0)
    findk$a[i] <- as.numeric(ab[1])
    findk$b[i] <- as.numeric(ab[2])
    findk$err[i] <- calc_err(tdata, findk$a[i], findk$b[i], 0)
    
    tdata <- idata[(i+1):nrow(idata), ]
    ab <- calc_ab(tdata, 0)
    findk$c[i] <- as.numeric(ab[1])
    findk$d[i] <- as.numeric(ab[2])
    findk$err[i] <- findk$err[i] + calc_err(tdata, findk$c[i], findk$d[i], 0)
  }
  
  findk <- findk[1:limit, ]
  findk.best <- subset(findk, err == min(findk$err))
  
  if(findk$err[1] != min(findk$err) & findk.best$a < 0 & findk.best$c > 0){
    min.dist <- abs(calc_y(2, findk.best$a, findk.best$b, 0)-calc_y(2, findk.best$c, findk.best$d, 0))
    min.k <- 2
    for(k in 3:200){
      dist <- abs(calc_y(k, findk.best$a, findk.best$b, 0)-calc_y(k, findk.best$c, findk.best$d, 0))
      if(min.dist > dist){
        min.dist <- dist
        min.k <- k
      }
    }
  }
  else{
    if(findk$a[1] > 0){
      min.k <- 2
    }
    else{
      min.k <- -1
    }
  }
  
  return(min.k)
}

sampling <- function(){
  samples <- as.data.frame(array(Inf, c(kfold+1, number_of_samples*2)))
  
  sample_predict <- function(training_data, testing_data, count){
    training_data.ncol <- length(training_data)
    
    max_arr <<- array(0, c(training_data.ncol))
    min_arr <<- array(0, c(training_data.ncol))
    update_min_max(training_data, training_data.ncol)
    
    kk <- 2
    idata <- as.data.frame(matrix(nrow=number_of_samples, ncol=2))
    for(i in 1:number_of_samples){
      check <- 0
      tryCatch(model.curg.kmeans <- kmeans(training_data, centers = kk),
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
      
      result.curg.kmeans <- predict(rf_model, testing_data)
      
      # curg : regression
      hybrid_training(training_data, kk, model.curg.kmeans$cluster, "random_forest", "runtime")
      result.curg.reg <- hybrid_testing(testing_data, kk, result.curg.kmeans, "runtime")

      samples[count, (i-1)*2+1] <<- floor(kk)
      samples[count, (i-1)*2+2] <<- result.curg.reg
      
      kk <- kk * sample_mul
    }
  }
  
  for(kf in 1:kfold){
    sample_predict(as.data.frame(list.training_df[kf]), as.data.frame(list.testing_df[kf]), kf)
  }
  
  for(kf in 1:(number_of_samples*2)){
    samples[kfold+1, kf] <- mean(samples[1:kfold, kf])
  }
  
  return(samples[kfold+1,])
}

get_optK <- function(){
  samples <- sampling()
  
  idata <- as.data.frame(matrix(nrow=number_of_samples, ncol=2))
  for(i in 1:13){
    if(!is.na(samples[(i-1)*2+2]) & samples[(i-1)*2+2] <= 200){
      idata[i, 1] <- samples[(i-1)*2+1]
      idata[i, 2] <- samples[(i-1)*2+2]
    }
  }
  
  retk <- find_bestk(idata)
  return(retk)
}



