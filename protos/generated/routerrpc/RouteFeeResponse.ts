// Original file: protos/router.proto

import type { PaymentFailureReason as _lnrpc_PaymentFailureReason, PaymentFailureReason__Output as _lnrpc_PaymentFailureReason__Output } from '../lnrpc/PaymentFailureReason';
import type { Long } from '@grpc/proto-loader';

export interface RouteFeeResponse {
  'routingFeeMsat'?: (number | string | Long);
  'timeLockDelay'?: (number | string | Long);
  'failureReason'?: (_lnrpc_PaymentFailureReason);
}

export interface RouteFeeResponse__Output {
  'routingFeeMsat': (string);
  'timeLockDelay': (string);
  'failureReason': (_lnrpc_PaymentFailureReason__Output);
}
