// Original file: protos/router.proto

import type { Route as _lnrpc_Route, Route__Output as _lnrpc_Route__Output } from '../lnrpc/Route';

export interface SendToRouteRequest {
  'paymentHash'?: (Buffer | Uint8Array | string);
  'route'?: (_lnrpc_Route | null);
  'skipTempErr'?: (boolean);
  'firstHopCustomRecords'?: ({[key: number]: Buffer | Uint8Array | string});
}

export interface SendToRouteRequest__Output {
  'paymentHash': (Buffer);
  'route': (_lnrpc_Route__Output | null);
  'skipTempErr': (boolean);
  'firstHopCustomRecords': ({[key: number]: Buffer});
}
