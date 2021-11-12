const router = require('express').Router();
const AccountRepository = require('../repositories/accountRepository');
const verifyIfExistsAccountCPF = require('../middlewares/verifyIfExistsAccountCPF');

router.get('/', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.getStatement(request, response);
})

router.get('/date', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.getStatementByDate(request, response);
})

module.exports = router;