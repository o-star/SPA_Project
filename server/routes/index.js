const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    console.log('client request test');
    res.send('test api');
})

module.exports = router;