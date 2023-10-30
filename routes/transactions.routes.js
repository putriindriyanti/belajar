var express = require('express');
var router = express.Router();
const { createTransactions, getAllTransactions, getTransactionsById } = require('../controllers/transactions.controllers');

router.post('/', createTransactions);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionsById);

module.exports = router;