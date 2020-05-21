import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: "income" | "outcome",
}

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type}: CreateTransactionDTO): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (value > total) {
        throw Error('The value outcome is bigger then total balance.');
      }
    }

    const transaction = this.transactionsRepository.create({
      title, value, type
    });

    return transaction;
  }

  public sumBalance({}: BalanceDTO) {}
}

export default CreateTransactionService;
