import { Inject, Injectable } from '@nestjs/common';
import { TransactionFilters } from 'src/models/transaction-filters';
import { Transaction } from '../models/transaction';
import { Database } from './db';

export interface TransactionRepository {
  getTransactions(filters: TransactionFilters): Promise<Transaction[]>;
  saveTransactions(trx: Transaction[]): Promise<void>;
}

@Injectable()
export class EthTransactionRepository implements TransactionRepository {
  constructor(@Inject('TRX_DB') private db: Database) {}

  async getTransactions(filters: TransactionFilters): Promise<Transaction[]> {
    return await this.db.getTransactions(
      filters.blockNumber,
      filters.hash,
      filters.fromAddress,
      filters.toAddress,
    );
  }
  async saveTransactions(trx: Transaction[]): Promise<void> {
    return await this.db.saveTransactions(trx);
  }
}
