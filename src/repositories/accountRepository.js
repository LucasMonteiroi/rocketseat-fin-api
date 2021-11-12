const { v4: uuidv4 } = require("uuid");

class AccountRepository {
  CUSTOMERS = [];
  
  getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
      if(operation.type === 'credit'){
        return acc + operation.amount;
      } else {
        return acc - operation.amount;
      }
    }, 0);

    return balance;
  }

  createAccount(request, response) {
    const account = request.body;
    
    const customerAlreadyExists = this.CUSTOMERS.some(
      (customer) => customer.cpf === account.cpf
    );

    if (customerAlreadyExists) {
      return response.status(400).json("Customer already exists!");
    }

    this.CUSTOMERS.push({
      id: uuidv4(),
      cpf: account.cpf,
      name: account.name,
      statement: [],
    });

    response.status(201).send();
  }


  updateAccount(request, response) {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
  }

  getAccount(request, response) {
    const { customer } = request;

    return response.json(customer);
  }

  deleteAccount(request, response) {
    const { customer } = request;
    
    this.CUSTOMERS.splice(customer, 1);

    return response.status(200).send(this.CUSTOMERS);
  }

  getStatement(request, response) {
    const { customer } = request; 
    const balance = this.getBalance(customer.statement);

    return response.json({
      totalBalance: balance,
      operations: customer.statement
    }); 
  }

  getStatementByDate(request, response) {
    const { customer } = request; 
    const { date } = request.query;

    const balance = this.getBalance(customer.statement);

    const dateFormat = new Date( date + " 00:00");

    const statement = customer.statement.filter(
      (statement) => 
        statement.created_at.toDateString() === 
        new Date(dateFormat).toDateString()
    );

    return response.json({
      totalBalance: balance,
      operations: statement
    }); 
  }

  makeDeposit(request, response) {
    const { description, amount } = request.body;
    const { customer } = request;
     
    const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit"
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }

  makeWithdraw(request, response) {
    const { amount } = request.body;
    const { customer } = request;

    const balance = this.getBalance(customer.statement);

    if(balance < amount) {
      return response.status(400).json({ error: "Insuficient funds!" });
    }

    const statementOperation = {
      amount,
      created_at: new Date(),
      type: "debit"
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }

  getAccountBalance(request, response) {
    const { customer } = request;

    const balance = this.getBalance(customer.statement);

    return response.json({
      balance
    })
  }
}

module.exports = new AccountRepository();
