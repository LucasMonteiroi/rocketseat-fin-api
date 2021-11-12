const repository = require('../repositories/accountRepository')

module.exports = function verifyIfExistsAccountCPF(request, response, next) {
  const CUSTOMERS = repository.CUSTOMERS;
  const { cpf } = request.headers;
  const customer = CUSTOMERS.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }

  request.customer = customer;

  return next();
};
