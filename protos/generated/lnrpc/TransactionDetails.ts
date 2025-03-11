// Original file: protos/lightning.proto

import type { Transaction as _lnrpc_Transaction, Transaction__Output as _lnrpc_Transaction__Output } from '../lnrpc/Transaction';
import type { Long } from '@grpc/proto-loader';

export interface TransactionDetails {
  'transactions'?: (_lnrpc_Transaction)[];
  'lastIndex'?: (number | string | Long);
  'firstIndex'?: (number | string | Long);
}

export interface TransactionDetails__Output {
  'transactions': (_lnrpc_Transaction__Output)[];
  'lastIndex': (string);
  'firstIndex': (string);
}
