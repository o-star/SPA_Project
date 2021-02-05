const express = require('express')
const router = express.Router();

router.get('/clusters', (req, res) => {
    console.log('client request clusters');

    res.json({ clusters: ['cluster 1', 'cluster 2', 'cluster 3', 'cluster 4', 'cluster 5', 'cluster 6'] });
})

router.get('/appnames', (req, res) => {
    console.log('client request appnames');

    res.send({ appnames: ['app 1', 'app 2'] });
})

router.get('/paramlist', (req, res) => {
    console.log('client request paramlist');
    setTimeout(() => {
        res.send(['param 1', 'param 2']);
    }, 500);
})

router.post('/estimate-result', (req, res) => {

})

module.exports = router;