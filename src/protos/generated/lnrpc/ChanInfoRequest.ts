// Original file: protos/lightning.proto

import type { Long } from '@grpc/proto-loader';

export interface ChanInfoRequest {
  'chanId'?: (number | string | Long);
  'chanPoint'?: (string);
}

export interface ChanInfoRequest__Output {
  'chanId': (string);
  'chanPoint': (string);
}
