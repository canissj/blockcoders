import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  blockNumber: string;

  @Prop()
  hash: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

export class TransactionDTO {
  constructor(public blockNumber: string, public hash: number) {}
}
