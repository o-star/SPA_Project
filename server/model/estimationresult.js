const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    cluster: String,
    appname: String,
    params: [],
    runtime: Number
})

const EstimationModel = mongoose.model("estimationresult", schema);

module.exports = EstimationModel;