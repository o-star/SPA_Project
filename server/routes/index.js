const express = require('express')
const router = express.Router();

router.get('/clusters', (req, res) => {
    console.log('client request clusters');
    setTimeout(() => {
        res.send(['cluster 1', 'cluster 2']);
    }, 500);
})

router.get('/appnames', (req, res) => {
    console.log('client request appnames');
    setTimeout(() => {
        res.send(['app 1', 'app 2']);
    }, 500);
})

router.get('/paramlist', (req, res) => {
    console.log('client request paramlist');
    setTimeout(() => {
        res.send(['param 1', 'param 2']);
    }, 500);
})

module.exports = router;