import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/repositories/transaction-repository';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRX_REPOSITORY')
    private transactionRepository: TransactionRepository,
  ) {}
}
