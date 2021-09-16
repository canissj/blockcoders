import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WSService {
  private ws = ethers.providers.InfuraProvider.getWebSocketProvider();

  constructor() {
    console.log('Initiating WS Service');

    this.ws.on('open', () => {
      console.log('WS Connection Opened');
    });

    this.ws.on('block', (blockNumber) => {
      console.log(`Block number: ${blockNumber}`);
    });

    this.ws.on('error', (e) => {
      console.log('Error');
    });
  }
}
