import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { EthNetworkService } from './services/eth.network.service';
import { ethers } from 'ethers';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './models/transaction';
import { EthTransactionRepository } from './repositories/transaction.repository';
import { MongoDB } from './repositories/db';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/m1'),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [TransactionController],
  providers: [
    EthNetworkService,
    TransactionService,
    {
      provide: 'TRX_REPOSITORY',
      useClass: EthTransactionRepository,
    },
    { provide: 'TRX_DB', useClass: MongoDB },
    {
      provide: 'ETH_WS',
      useValue: ethers.providers.InfuraProvider.getWebSocketProvider('rinkeby'),
    },
    {
      provide: 'ETH_API',
      useValue: new ethers.providers.InfuraProvider('rinkeby'),
    },
  ],
})
export class AppModule {}
