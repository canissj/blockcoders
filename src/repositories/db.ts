import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
  TransactionDTO,
} from '../models/transaction';

export interface Database {
  getTransactions(filters?: TransactionFilters): Promise<Transaction[]>;
  saveTransactions(transactions: Transaction[]): Promise<void>;
}

export class MongoDB implements Database {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    return await this.transactionModel.find().exec();
  }

  async saveTransactions(transactions: TransactionDTO[]): Promise<void> {
    const trxModels = transactions.map((trx) => {
      new this.transactionModel(trx);
    });

    try {
      await this.transactionModel.insertMany(trxModels);
    } catch (err) {
      console.log('Error saving transactions');
      throw new Error();
    }
  }
}
