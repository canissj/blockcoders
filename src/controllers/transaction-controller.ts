import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app-service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: AppService) {}

  @Get()
  getTransaction(): string {
    return this.transactionService.getHello();
  }
}
