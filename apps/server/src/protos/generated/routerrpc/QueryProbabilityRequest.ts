// Original file: router.proto

import type { Long } from '@grpc/proto-loader';

export interface QueryProbabilityRequest {
  'fromNode'?: (Buffer | Uint8Array | string);
  'toNode'?: (Buffer | Uint8Array | string);
  'amtMsat'?: (number | string | Long);
}

export interface QueryProbabilityRequest__Output {
  'fromNode': (Buffer);
  'toNode': (Buffer);
  'amtMsat': (string);
}
