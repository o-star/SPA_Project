arg <- commandArgs()

library(ABCoptim)
library(readr)

folder <- paste0(getwd(), "/..")
tname <- arg[6]
source(paste0(folder, "/pre_proc_func.R"), echo=TRUE)

sd_const_value = 0.01
outlier_cut_percent = 95
outlier_cut_value = 1
outlier_minimun_row = 10
ml_outlier_cut_value = 5


tname <- "dmd_pol"
df <- read.table(arg[7], header = TRUE, 
                 sep = ",",stringsAsFactor = TRUE,na.strings = "")
tr <- df[1:(nrow(df)*0.8), ]
va <- df[(nrow(df)*0.8+1):nrow(df), ]

k <- length(tr) - 1
tr.row <- nrow(tr)

tt <- rbind(tr, va)

for(i in 1:k){
  if(is.factor(tr[1, i])){
    tt[, i] <- as.numeric(tt[, i])
  }
}

tr <- tt[1:tr.row, ]
va <- tt[(tr.row+1):nrow(tt), ]

# Data generating process

X <- as.matrix(tr[, 1:k])
y <- as.matrix(tr[, k+1])

# Objective function
fun <- function(x) {
  t <- X%*%x
  (abs(y-(t))/((y+(t))/2))^2
  #(y-X%*%x)^2/(y-mean(y))^2
}
# Running the regression

err <- 100000

mlb <- 0
mub <- 0

lbv <- 0.00001
for(i in 1:11){
  ubv <- 0.00001
  for(j in 1:11){
    ans <- abc_optim(rep(0,k), fun, lb = -lbv, ub = ubv, maxCycle=10000)
    # print(cbind(ans$par))
    ti <- as.matrix(va[, 1:k])
    to <- as.matrix(va[, k+1])
    pr <- ti%*%ans$par
    
    rt <- cbind(to, pr)
    colnames(rt) <- c("cor", "ans")
    rt <- as.data.frame(as.matrix(rt))
    rt <- subset(rt, ans > 0)
    
    rs <- as.data.frame(abs(rt$ans-rt$cor)/((rt$ans+rt$cor)/2)*100)
    colnames(rs) <- c("runtime")
    rs <- delete_outlier(rs, nrow(rs), "runtime", ml_outlier_cut_value)
    print(paste(i, j, round(mean(as.matrix(rs)), 2)))
    
    t <- round(mean(as.matrix(rs)), 2)
    if(!is.na(t)){
      if(err > t){
        err <- t
        mlb <- lbv
        mub <- ubv
      }
    }

    ubv <- ubv * 10
  }

  lbv <- lbv * 10
}

print(paste0("ERROR: ", err))
# print(paste(-mlb, mub))
