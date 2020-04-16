// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExists) {
      const createCategory = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(createCategory);
    }
    const searchCategoryID = await categoriesRepository.find({
      where: { title: category },
    });

    const category_id = searchCategoryID[0].id;

    const transactionRepository = getRepository(Transaction);

    const createTransaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionRepository.save(createTransaction);

    return createTransaction;
  }
}

export default CreateTransactionService;
