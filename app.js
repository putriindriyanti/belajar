require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { PORT = 3000 } = process.env;
var usersRouter = require('./routes/users.routes');
var accountsRouter = require('./routes/accounts.routes');
var transactionsRouter = require('./routes/transactions.routes');
const authRouter = require('./routes/auth.routes');
const cors = require('cors');


var app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/accounts', accountsRouter);
app.use('/api/v1/transactions', transactionsRouter);


// app.listen(PORT, () => console.log('Listening on port', PORT));


module.exports = app;





