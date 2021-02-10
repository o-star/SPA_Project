var child_process = require('child_process');
var exec = child_process.exec;

const callR = (path) => {
  return new Promise((resolve, reject) => {
    // apt-get -y build-dep libcurl4-gnutls-dev
    // apt-get -y install libcurl4-gnutls-dev

    var cmd = 'Rscript /Users/ostar/Desktop/Git/SPA_Project/server/rscript/predict.R ' + "dmd_pol 1024 64 5 0.5 1 1 20 1 > temp.txt";
    exec(cmd, function (error, stdout, stderr) {
      if (error) {
        console.log('error: ' + error);
      }
      else if (stderr) {
        console.log('stderr: ' + stderr);
      }
      else if (stdout) {
        console.log('stdout' + stdout);
        return stdout;
      }
    });
    resolve();
  });
}

const updateR = async ({ inputRData }) => {
  const start = new Date().getTime();
  const data = await callR();

  let status = 'Failure';
  if (data) status = 'Success';

  const gap = new Date().getTime() - start;
  console.log(Number(((gap) / 1000).toFixed(3)));
  return Number(((gap) / 1000).toFixed(3));
}

module.exports = updateR;