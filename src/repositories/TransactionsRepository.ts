import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = getRepository(Transaction);
    const allTransactions = await transactions.find();

    const income = allTransactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acu, cur) => acu + cur.value, 0);

    const outcome = allTransactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acu, cur) => acu + cur.value, 0);

    if (outcome > income) throw new AppError('Falhou');

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
