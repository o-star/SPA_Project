const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    cluster: String,
    appname: String,
    params: Array
})

const EstimationTypeModel = mongoose.model("estimationtype", schema);

module.exports = EstimationTypeModel;