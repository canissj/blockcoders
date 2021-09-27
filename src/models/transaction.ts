import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  blockNumber: string;

  @Prop()
  hash: string;

  @Prop()
  from: string;

  @Prop()
  to: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

export class TransactionDTO {
  constructor(
    public blockNumber: string,
    public hash: string,
    public from: string,
    public to: string,
  ) {}
}
