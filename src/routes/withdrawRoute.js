const router = require('express').Router();
const AccountRepository = require('../repositories/accountRepository');
const verifyIfExistsAccountCPF = require('../middlewares/verifyIfExistsAccountCPF');

router.post('/', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.makeWithdraw(request, response);
})

module.exports = router;