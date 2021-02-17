const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    cluster: String,
    appname: String,
    runtime: Number
})

const TrainingDataModel = mongoose.model("trainingdata", schema);

module.exports = TrainingDataModel;