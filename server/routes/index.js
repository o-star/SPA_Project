const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const updateR = require('../rscript/executeR.js')
const EstimationTypeModel = require('../model/EstimationType')
const StatisticDataModel = require('../model/StatisticDataType')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//get cluster type API
router.get('/clusters', (req, res) => {
    // console.log('client request clusters');

    EstimationTypeModel.find().distinct('cluster', (err, data) => {
        if (err) console.log(err);

        res.json(data);
    })
})

// get app type API
router.get('/appnames/:cluster', (req, res) => {
    // console.log('client request appnames');

    let selecttype = req.params.cluster;
    EstimationTypeModel.find({ "cluster": selecttype }).distinct('appname', (err, data) => {
        if (err) console.log(err);

        res.json(data);
    })
})

// get parameter API
router.get('/params/:cluster/:appname', (req, res) => {
    // console.log('client request paramlist');

    let selectcluter = req.params.cluster, selectapp = req.params.appname
    EstimationTypeModel.findOne({ "cluster": selectcluter, "appname": selectapp })
        .distinct('params', (err, data) => {
            if (err) console.log(err);

            res.json(data);
        })
})

// estimation result predict API
router.post('/estimate-result', (req, res) => {

    let median = -1; // actual runtime 집합 중 중앙값, default value : -1

    StatisticDataModel.findOne({ "cluster": req.body.cluster, "appname": req.body.appname, "params": req.body.params },
        (err, data) => {
            if (err)
                console.log(err);
            else {
                // console.log(data);
                if (data === null) {
                    StatisticDataModel.create({ "cluster": req.body.cluster, "appname": req.body.appname, "params": req.body.params, "count": 1, "runtimes": [] },
                        (err) => {
                            if (err) console.log(err);
                            // else console.log("New Statistics data add");
                        })
                }   // 해당 파라미터가 처음으로 estimate되는 경우

                else {
                    StatisticDataModel.updateOne({ "cluster": req.body.cluster, "appname": req.body.appname, "params": req.body.params },
                        { $set: { count: data.count + 1 } },
                        (err) => {
                            if (err) console.log(err);
                            // else console.log("existing Statistics data add");
                        })

                    if (data.runtimes.length !== 0 || data.runtimes.length !== null) {
                        if (data.runtimes.length % 2) median = data.runtimes[Math.floor(data.runtimes.length / 2)];
                        else median = (data.runtimes[data.runtimes.length / 2] + data.runtimes[data.runtimes.length / 2 - 1]) / 2;
                    }   // 중앙값 산출

                }   // estimate해본 적 있는 파라미터가 들어온 경우

                new Promise((resolve, reject) => {
                    let exectime = updateR(req.body);
                    resolve(exectime);
                })
                    .then((exectime) => res.send([exectime, median]))
            }
        })
})

// parameter statistics API
router.get('/statistics/:appname', (req, res) => {
    StatisticDataModel.find({ "appname": req.params.appname }).sort({ "count": -1 }).limit(10)
        .then((data) => {
            // console.log(data);
            res.json(data)
        });

    // console.log("params ranking data send");
})

module.exports = router;