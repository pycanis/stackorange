// Original file: protos/lightning.proto

import type { Payment as _lnrpc_Payment, Payment__Output as _lnrpc_Payment__Output } from '../lnrpc/Payment';
import type { Long } from '@grpc/proto-loader';

export interface ListPaymentsResponse {
  'payments'?: (_lnrpc_Payment)[];
  'firstIndexOffset'?: (number | string | Long);
  'lastIndexOffset'?: (number | string | Long);
  'totalNumPayments'?: (number | string | Long);
}

export interface ListPaymentsResponse__Output {
  'payments': (_lnrpc_Payment__Output)[];
  'firstIndexOffset': (string);
  'lastIndexOffset': (string);
  'totalNumPayments': (string);
}
