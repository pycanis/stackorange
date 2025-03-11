// Original file: protos/router.proto

import type { Long } from '@grpc/proto-loader';

export interface BimodalParameters {
  'nodeWeight'?: (number | string);
  'scaleMsat'?: (number | string | Long);
  'decayTime'?: (number | string | Long);
}

export interface BimodalParameters__Output {
  'nodeWeight': (number);
  'scaleMsat': (string);
  'decayTime': (string);
}
