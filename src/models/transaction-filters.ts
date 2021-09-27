export class TransactionFilters {
  constructor(
    // filter by block number
    public blockNumber?: string,

    // filter by trx hash id
    public hash?: string,

    // filter sender address
    public fromAddress?: string,

    // filter by receiver address
    public toAddress?: string,
  ) {}
}
