import { Controller, Get, Query } from '@nestjs/common';
import { Transaction } from 'src/models/transaction';
import { TransactionFilters } from 'src/models/transaction.filters';
import { TransactionService } from '../services/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(
    @Query('blockNumber') blockNumber,
    @Query('hash') hash,
    @Query('fromAddress') fromAddress,
    @Query('toAddress') toAddress,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactions(
      new TransactionFilters(blockNumber, hash, fromAddress, toAddress),
    );
  }
}
