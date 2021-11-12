const router = require('express').Router();
const AccountRepository = require('../repositories/accountRepository');
const verifyIfExistsAccountCPF = require('../middlewares/verifyIfExistsAccountCPF');

router.get ('/', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.getAccountBalance(request, response);
})

module.exports = router;