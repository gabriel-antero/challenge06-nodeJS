// import AppError from '../errors/AppError';

import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const deleteTransactions = getRepository(Transaction);
    await deleteTransactions.delete({ id });
  }
}

export default DeleteTransactionService;
