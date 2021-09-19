import { Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthNetworkService {
  constructor(
    @Inject('ETH_WS') private ws: ethers.providers.WebSocketProvider,
    @Inject('ETH_API') private api: ethers.providers.UrlJsonRpcProvider,
  ) {
    this.ws.on('block', (blockNumber) => {
      console.log(`Block number: ${blockNumber}`);
      this.api.getBlockWithTransactions(blockNumber).then((block) => {
        console.log(block);
      });
    });
  }
}
