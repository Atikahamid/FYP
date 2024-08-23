const express = require('express');

const router = express.Router();

router.get('/get-payment', (req, res) => {
    res.json('Payment Details');
})

module.exports = router