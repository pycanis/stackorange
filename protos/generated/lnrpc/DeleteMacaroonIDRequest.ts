// Original file: protos/lightning.proto

import type { Long } from '@grpc/proto-loader';

export interface DeleteMacaroonIDRequest {
  'rootKeyId'?: (number | string | Long);
}

export interface DeleteMacaroonIDRequest__Output {
  'rootKeyId': (string);
}
