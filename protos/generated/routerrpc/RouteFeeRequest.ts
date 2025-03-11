// Original file: protos/router.proto

import type { Long } from '@grpc/proto-loader';

export interface RouteFeeRequest {
  'dest'?: (Buffer | Uint8Array | string);
  'amtSat'?: (number | string | Long);
  'paymentRequest'?: (string);
  'timeout'?: (number);
}

export interface RouteFeeRequest__Output {
  'dest': (Buffer);
  'amtSat': (string);
  'paymentRequest': (string);
  'timeout': (number);
}
