import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ethers } from 'ethers';
import {
  TransactionCreatedEventId,
  TransactionCreatedEvent,
} from 'src/events/transaction';
import { TransactionDTO } from 'src/models/transaction';

@Injectable()
export class EthNetworkService {
  constructor(
    @Inject('ETH_WS') private ws: ethers.providers.WebSocketProvider,
    @Inject('ETH_API') private api: ethers.providers.UrlJsonRpcProvider,
    private eventEmitter: EventEmitter2,
  ) {
    this.ws.on('block', (blockNumber) => {
      console.log(`Block number: ${blockNumber}`);
      this.api.getBlockWithTransactions(blockNumber).then((block) => {
        console.log('Transactions fetched');
        const trx = block.transactions.map(
          (trx) => new TransactionDTO(blockNumber, trx.hash),
        );
        eventEmitter.emit(
          TransactionCreatedEventId,
          new TransactionCreatedEvent(trx),
        );
      });
    });
  }
}
