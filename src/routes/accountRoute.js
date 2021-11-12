const router = require('express').Router();
const AccountRepository = require('../repositories/accountRepository');
const verifyIfExistsAccountCPF = require('../middlewares/verifyIfExistsAccountCPF');

router.post('/', (request, response) => {
  AccountRepository.createAccount(request, response);  
  
})

router.put('/', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.updateAccount(request, response);  
})

router.get('/', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.getAccount(request, response);  
})

router.delete('/', verifyIfExistsAccountCPF, (request, response) => {
  AccountRepository.deleteAccount(request, response);
})

module.exports = router;