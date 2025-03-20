// Original file: router.proto

import type { PairData as _routerrpc_PairData, PairData__Output as _routerrpc_PairData__Output } from '../routerrpc/PairData';

export interface PairHistory {
  'nodeFrom'?: (Buffer | Uint8Array | string);
  'nodeTo'?: (Buffer | Uint8Array | string);
  'history'?: (_routerrpc_PairData | null);
}

export interface PairHistory__Output {
  'nodeFrom': (Buffer);
  'nodeTo': (Buffer);
  'history': (_routerrpc_PairData__Output | null);
}
