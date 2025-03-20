// Original file: router.proto

import type { HtlcInfo as _routerrpc_HtlcInfo, HtlcInfo__Output as _routerrpc_HtlcInfo__Output } from '../routerrpc/HtlcInfo';
import type { _lnrpc_Failure_FailureCode, _lnrpc_Failure_FailureCode__Output } from '../lnrpc/Failure';
import type { FailureDetail as _routerrpc_FailureDetail, FailureDetail__Output as _routerrpc_FailureDetail__Output } from '../routerrpc/FailureDetail';

export interface LinkFailEvent {
  'info'?: (_routerrpc_HtlcInfo | null);
  'wireFailure'?: (_lnrpc_Failure_FailureCode);
  'failureDetail'?: (_routerrpc_FailureDetail);
  'failureString'?: (string);
}

export interface LinkFailEvent__Output {
  'info': (_routerrpc_HtlcInfo__Output | null);
  'wireFailure': (_lnrpc_Failure_FailureCode__Output);
  'failureDetail': (_routerrpc_FailureDetail__Output);
  'failureString': (string);
}
