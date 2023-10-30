var express = require('express');
var router = express.Router();
const { createUsers, getAllUsers, getUserById } = require('../controllers/users.controllers');

router.post('/', createUsers);
router.get('/', getAllUsers);
router.get('/:id', getUserById);


module.exports = router;
