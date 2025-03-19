// Original file: protos/router.proto

import type { Long } from '@grpc/proto-loader';

export interface CircuitKey {
  'chanId'?: (number | string | Long);
  'htlcId'?: (number | string | Long);
}

export interface CircuitKey__Output {
  'chanId': (string);
  'htlcId': (string);
}
