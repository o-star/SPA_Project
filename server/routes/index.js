const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const executeR = require('../rscript/executeR.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/clusters', (req, res) => {
    console.log('client request clusters');

    res.json({ clusters: ['cluster 1', 'cluster 2', 'cluster 3', 'cluster 4', 'cluster 5', 'cluster 6'] });
})

router.get('/appnames', (req, res) => {
    console.log('client request appnames');

    res.send({ appnames: ['app 1', 'app 2'] });
})

router.get('/params', (req, res) => {
    console.log('client request paramlist');
    setTimeout(() => {
        res.send({params: ['param 1', 'param 2', 'param 3', 'param 4']});
    }, 500);
})

router.post('/estimate-result', (req, res) => {
    let exectime = executeR(req.body);
    console.log(exectime);
})

module.exports = router;