// Original file: lightning.proto


export interface GetTransactionsRequest {
  'startHeight'?: (number);
  'endHeight'?: (number);
  'account'?: (string);
  'indexOffset'?: (number);
  'maxTransactions'?: (number);
}

export interface GetTransactionsRequest__Output {
  'startHeight': (number);
  'endHeight': (number);
  'account': (string);
  'indexOffset': (number);
  'maxTransactions': (number);
}
