const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// let clustertype = "Computational Thermal Fluid"
let clustertype = "Nanophysics"
// let clustertype = "Calculation Chemistry"
// let clustertype = "Computational Medicine"
let appname = "WaveSimulation"
let filePath = path.join(__dirname, `${appname}.csv`);


//mongodb 코드
const mongoURI = 'mongodb://155.230.36.20:27017/SPAdb'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected...')
        readFile(filePath);
    })
    .catch((err) => console.log(err))


let schema = new mongoose.Schema({
    cluster: String,
    appname: String,
    params: Array,
    count: Number
})

const StatisticDataModel = mongoose.model("statisticdata", schema);


const readFile = async (filePath) => {
    var data = fs.readFileSync(filePath, { encoding: "utf8" });
    var rows = data.split("\n");

    for (var rowIndex in rows) {
        var row = rows[rowIndex].split(",");
        var params = [];
        var existdata;


        if (rowIndex === "0") { var columns = row; }
        else {
            for (var columnIndex in columns) { // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
                var column = columns[columnIndex];
                if (column === 'runtime') continue;
                else
                    params.push(row[columnIndex]);
            }


            let existdata = await StatisticDataModel.findOne({ "cluster": clustertype, "appname": appname, "params": params })

            if (existdata === null) {
                await StatisticDataModel.create({ "cluster": clustertype, "appname": appname, "params": params, "count": 1 })
            }   // 해당 파라미터가 처음으로 estimate되는 경우

            else {
                await StatisticDataModel.updateOne({ "cluster": clustertype, "appname": appname, "params": params },
                    { $set: { count: existdata.count + 1 } })
            }

        }
    }
    console.log("finish");
}