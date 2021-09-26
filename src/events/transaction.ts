import { Transaction } from 'src/models/transaction';

export class TransactionCreatedEvent {
  constructor(public payload: Transaction[]) {}
}

export const TransactionCreatedEventId = 'trx.created';
