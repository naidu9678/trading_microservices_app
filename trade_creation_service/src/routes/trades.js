const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validate = require('../middleware/validateRequest');
const { createTrade } = require('../controllers/tradeController');

const tradeSchema = Joi.object({
  tradeId: Joi.string().optional(),
  symbol: Joi.string().uppercase().required(),
  type: Joi.string().valid('BUY','SELL').required(),
  quantity: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  trader: Joi.string().required(),
  status: Joi.string().valid('NEW','FILLED','CANCELLED').optional(),
  meta: Joi.object().optional()
});

router.post('/', validate(tradeSchema), createTrade);

router.get('/health', (req, res) => res.json({ status: 'ok', service: 'trade-creator' }));

module.exports = router;
