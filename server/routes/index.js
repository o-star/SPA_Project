const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const executeR = require('../rscript/executeR.js')
const EstimationModel = require('../model/estimationresult')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/clusters', (req, res) => {
    console.log('client request clusters');

    EstimationModel.find().distinct('cluster', (err, data) => {
        if (err) console.log(err);

        res.json(data);
    })
})

router.get('/appnames/:cluster', (req, res) => {
    console.log('client request appnames');

    let selecttype = req.params.cluster;
    EstimationModel.find({ "cluster": selecttype }).distinct('appname', (err, data) => {
        if (err) console.log(err);

        res.json(data);
    })
})

router.get('/params/:cluster/:appname', (req, res) => {
    console.log('client request paramlist');

    let selectcluter = req.params.cluster, selectapp = req.params.appname
    EstimationModel.findOne({ "cluster": selectcluter, "appname": selectapp }
        , { "_id": false, "runtime": false, "cluster": false, "appname": false }
        , (err, data) => {
            if (err) console.log(err);

            res.json(data);
        })
})

router.post('/estimate-result', (req, res) => {
    let exectime = executeR(req.body);
    console.log(exectime);
})

module.exports = router;