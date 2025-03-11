// Original file: protos/lightning.proto

import type { Long } from '@grpc/proto-loader';

export interface MPPRecord {
  'totalAmtMsat'?: (number | string | Long);
  'paymentAddr'?: (Buffer | Uint8Array | string);
}

export interface MPPRecord__Output {
  'totalAmtMsat': (string);
  'paymentAddr': (Buffer);
}
