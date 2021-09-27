import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/repositories/transaction-repository';
import { Transaction } from 'src/models/transaction';
import { OnEvent } from '@nestjs/event-emitter';
import {
  TransactionCreatedEvent,
  TransactionCreatedEventId,
} from 'src/events/transaction';
import { TransactionFilters } from 'src/models/transaction-filters';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRX_REPOSITORY')
    private transactionRepository: TransactionRepository,
  ) {}

  @OnEvent(TransactionCreatedEventId)
  saveTransactions(trxCreatedEvent: TransactionCreatedEvent) {
    this.transactionRepository
      .saveTransactions(trxCreatedEvent.payload)
      .then(() => console.log('Transactions saved'))
      .catch((e) => console.log('Error saving trx')); // ideally track error, and use retry messaging mechanisms (e.g message queues)
  }

  async getTransactions(filters: TransactionFilters): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactions(filters);
  }
}
