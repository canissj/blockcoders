import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/repositories/transaction-repository';
import { TransactionDTO } from 'src/models/transaction';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionCreatedEvent, TransactionCreatedEventId } from 'src/events/transaction';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRX_REPOSITORY')
    private transactionRepository: TransactionRepository,
  ) {}

  @OnEvent(TransactionCreatedEventId)
  saveTransactions(trxCreatedEvent: TransactionCreatedEvent) {
    console.log('Saving started...');
    this.transactionRepository
      .saveTransactions(trxCreatedEvent.payload)
      .then(() => console.log('Transactions saved'))
      .catch((e) => console.log('Error saving trx'));
  }
}
