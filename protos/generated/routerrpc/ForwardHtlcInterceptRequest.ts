// Original file: protos/router.proto

import type { CircuitKey as _routerrpc_CircuitKey, CircuitKey__Output as _routerrpc_CircuitKey__Output } from '../routerrpc/CircuitKey';
import type { Long } from '@grpc/proto-loader';

export interface ForwardHtlcInterceptRequest {
  'incomingCircuitKey'?: (_routerrpc_CircuitKey | null);
  'paymentHash'?: (Buffer | Uint8Array | string);
  'outgoingAmountMsat'?: (number | string | Long);
  'outgoingExpiry'?: (number);
  'incomingAmountMsat'?: (number | string | Long);
  'incomingExpiry'?: (number);
  'outgoingRequestedChanId'?: (number | string | Long);
  'customRecords'?: ({[key: number]: Buffer | Uint8Array | string});
  'onionBlob'?: (Buffer | Uint8Array | string);
  'autoFailHeight'?: (number);
  'inWireCustomRecords'?: ({[key: number]: Buffer | Uint8Array | string});
}

export interface ForwardHtlcInterceptRequest__Output {
  'incomingCircuitKey': (_routerrpc_CircuitKey__Output | null);
  'paymentHash': (Buffer);
  'outgoingAmountMsat': (string);
  'outgoingExpiry': (number);
  'incomingAmountMsat': (string);
  'incomingExpiry': (number);
  'outgoingRequestedChanId': (string);
  'customRecords': ({[key: number]: Buffer});
  'onionBlob': (Buffer);
  'autoFailHeight': (number);
  'inWireCustomRecords': ({[key: number]: Buffer});
}
