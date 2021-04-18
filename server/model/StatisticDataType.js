const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    cluster: String,    //cluster type 명시
    appname: String,    //app name 명시
    params: Array,      //parameter set 저장
    runtimes: Array,    //actual runtime sort Array
    count: Number       //execution count 저장
})

const StatisticDataModel = mongoose.model("statisticdata", schema);

module.exports = StatisticDataModel;