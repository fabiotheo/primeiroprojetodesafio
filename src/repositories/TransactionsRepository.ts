import Transaction from '../models/Transaction';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: "income" | "outcome",
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDTO {
    let incomeValue = 0;
    let outcomeValue = 0;
    this.transactions.map(function (transaction) {
      if (transaction.type === 'income') {
        incomeValue = transaction.value + incomeValue;
      } else if (transaction.type === 'outcome') {
        outcomeValue = transaction.value + outcomeValue;
      }
    });
    const total = incomeValue - outcomeValue;

    return { income: incomeValue, outcome: outcomeValue, total: total};
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
