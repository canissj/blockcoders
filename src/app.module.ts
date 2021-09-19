import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction-controller';
import { EthNetworkService } from './services/eth-network-service';
import { ethers } from 'ethers';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './models/transaction';
import { EthTransactionRepository } from './repositories/transaction-repository';
import { MongoDB } from './repositories/db';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/trx-db'),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    EthNetworkService,
    { provide: 'TRX_REPOSITORY', useClass: EthTransactionRepository },
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
