var express = require('express');
var router = express.Router();
const { createAccounts, getAllAccounts, getAccountsById} = require('../controllers/accounts.controllers');

router.post('/', createAccounts);
router.get('/', getAllAccounts);
router.get('/:id', getAccountsById);


module.exports = router;