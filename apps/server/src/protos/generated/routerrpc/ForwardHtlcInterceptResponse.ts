// Original file: router.proto

import type { CircuitKey as _routerrpc_CircuitKey, CircuitKey__Output as _routerrpc_CircuitKey__Output } from '../routerrpc/CircuitKey';
import type { ResolveHoldForwardAction as _routerrpc_ResolveHoldForwardAction, ResolveHoldForwardAction__Output as _routerrpc_ResolveHoldForwardAction__Output } from '../routerrpc/ResolveHoldForwardAction';
import type { _lnrpc_Failure_FailureCode, _lnrpc_Failure_FailureCode__Output } from '../lnrpc/Failure';
import type { Long } from '@grpc/proto-loader';

export interface ForwardHtlcInterceptResponse {
  'incomingCircuitKey'?: (_routerrpc_CircuitKey | null);
  'action'?: (_routerrpc_ResolveHoldForwardAction);
  'preimage'?: (Buffer | Uint8Array | string);
  'failureMessage'?: (Buffer | Uint8Array | string);
  'failureCode'?: (_lnrpc_Failure_FailureCode);
  'inAmountMsat'?: (number | string | Long);
  'outAmountMsat'?: (number | string | Long);
  'outWireCustomRecords'?: ({[key: number]: Buffer | Uint8Array | string});
}

export interface ForwardHtlcInterceptResponse__Output {
  'incomingCircuitKey': (_routerrpc_CircuitKey__Output | null);
  'action': (_routerrpc_ResolveHoldForwardAction__Output);
  'preimage': (Buffer);
  'failureMessage': (Buffer);
  'failureCode': (_lnrpc_Failure_FailureCode__Output);
  'inAmountMsat': (string);
  'outAmountMsat': (string);
  'outWireCustomRecords': ({[key: number]: Buffer});
}
