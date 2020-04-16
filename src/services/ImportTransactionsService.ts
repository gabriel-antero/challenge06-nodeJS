import path from 'path';
import csv from 'csvtojson';
import uploadConfig from '../config/upload';

import CreateTransactionService from './CreateTransactionService';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface FileName {
  filename: string;
}

class ImportTransactionsService {
  async execute({ filename }: FileName): Promise<Transaction[]> {
    const filePath = path.join(uploadConfig.directory, filename);

    const transactionsCSV = await csv().fromFile(filePath);

    const createTransactionService = new CreateTransactionService();

    const transactions: Transaction[] = [];

    /* eslint-disable */
    for (const transaction of transactionsCSV) {
      await createTransactionService.execute( transaction );

      transactions.push(transaction);
    }
    /* eslint-disable */

    return transactions;
  }
}

export default ImportTransactionsService;
