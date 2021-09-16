import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app-service';
import { WSService } from './services/socket-service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WSService],
})
export class AppModule {}
