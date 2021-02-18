const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    cluster: String,
    appname: String,
    params: Array,
    count: Number
})

const StatisticDataModel = mongoose.model("statisticdata", schema);

module.exports = StatisticDataModel;