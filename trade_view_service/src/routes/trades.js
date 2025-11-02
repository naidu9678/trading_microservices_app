const express = require('express');
const router = express.Router();
const { listTrades, getTrade } = require('../controllers/tradeController');

router.get('/', listTrades);
router.get('/:id', getTrade);

router.get('/health', (req, res) => res.json({ status: 'ok', service: 'trade-viewer' }));

module.exports = router;
