var child_process = require('child_process');
var exec = child_process.exec;

const callR = (inputRData) => {
  return new Promise((resolve, reject) => {
    // apt-get -y build-dep libcurl4-gnutls-dev
    // apt-get -y install libcurl4-gnutls-dev

    let inputStr = inputRData.appname;
    let paramsize = inputRData.params.length;
    for (let k = 0; k < paramsize; k++)
      inputStr += ` ${inputRData.params[k]}`
    //input data exec 실행 파라미터 문자열 생성  

    var cmd = 'Rscript ' + __dirname + '/predict.R ' + inputStr;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log('error: ' + error);
        resolve(error)
      }

      resolve(stdout)
    });
  });
}

const updateR = async (inputRData) => {

  const data = await callR(inputRData);

  console.log('predict time : ' + data);
  return data;
}

module.exports = updateR;
