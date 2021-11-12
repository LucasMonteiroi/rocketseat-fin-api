const route = require('express').Router();
const accountRoute = require('./accountRoute');
const statementRoute = require('./statementRoute');
const depositRoute = require('./depositRoute');
const withdrawRoute = require('./withdrawRoute')
const balanceRoute = require('./balanceRoute');

route.use('/account', accountRoute);
route.use('/statement', statementRoute);
route.use('/deposit', depositRoute);
route.use('/withdraw', withdrawRoute);
route.use('/balance', balanceRoute);

module.exports = route;