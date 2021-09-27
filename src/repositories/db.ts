import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
  TransactionDTO,
} from '../models/transaction';

export interface Database {
  getTransactions(
    blockNumber?: string,
    hash?: string,
    fromAddress?: string,
    toAddress?: string,
  ): Promise<Transaction[]>;

  saveTransactions(transactions: Transaction[]): Promise<void>;
}

export class MongoDB implements Database {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactions(
    blockNumber?: string,
    hash?: string,
    fromAddress?: string,
    toAddress?: string,
  ): Promise<Transaction[]> {
    const query = this.transactionModel.find();
    if (hash) query.where('hash').equals(hash);
    if (blockNumber) query.where('blockNumber').equals(blockNumber);
    if (fromAddress) query.where('from').equals(fromAddress);
    if (toAddress) query.where('to').equals(toAddress);

    query.select('-_id -__v');
    return await query.exec();
  }

  async saveTransactions(transactions: TransactionDTO[]): Promise<void> {
    const trxModels = transactions.map((trx) => {
      return new this.transactionModel(trx);
    });

    try {
      await this.transactionModel.insertMany(trxModels);
    } catch (err) {
      console.log('Error saving transactions');
      throw new Error();
    }
  }
}
