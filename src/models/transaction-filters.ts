interface TransactionFilters {
  // filter by block number
  blockNumber?: string;

  // filter by trx hash id
  hash?: string;

  // filter sender address
  fromAddress?: string;

  // filter by receiver address
  toAddress?: string;
}
