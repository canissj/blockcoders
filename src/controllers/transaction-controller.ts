import { Controller, Get } from '@nestjs/common';
import { TransactionService } from '../services/transaction-service';

@Controller()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(): string {
    return 'hey';
  }
}
