// Original file: router.proto

import type { RouteHint as _lnrpc_RouteHint, RouteHint__Output as _lnrpc_RouteHint__Output } from '../lnrpc/RouteHint';
import type { FeatureBit as _lnrpc_FeatureBit, FeatureBit__Output as _lnrpc_FeatureBit__Output } from '../lnrpc/FeatureBit';
import type { Long } from '@grpc/proto-loader';

export interface SendPaymentRequest {
  'dest'?: (Buffer | Uint8Array | string);
  'amt'?: (number | string | Long);
  'paymentHash'?: (Buffer | Uint8Array | string);
  'finalCltvDelta'?: (number);
  'paymentRequest'?: (string);
  'timeoutSeconds'?: (number);
  'feeLimitSat'?: (number | string | Long);
  'outgoingChanId'?: (number | string | Long);
  'cltvLimit'?: (number);
  'routeHints'?: (_lnrpc_RouteHint)[];
  'destCustomRecords'?: ({[key: number]: Buffer | Uint8Array | string});
  'amtMsat'?: (number | string | Long);
  'feeLimitMsat'?: (number | string | Long);
  'lastHopPubkey'?: (Buffer | Uint8Array | string);
  'allowSelfPayment'?: (boolean);
  'destFeatures'?: (_lnrpc_FeatureBit)[];
  'maxParts'?: (number);
  'noInflightUpdates'?: (boolean);
  'outgoingChanIds'?: (number | string | Long)[];
  'paymentAddr'?: (Buffer | Uint8Array | string);
  'maxShardSizeMsat'?: (number | string | Long);
  'amp'?: (boolean);
  'timePref'?: (number | string);
  'cancelable'?: (boolean);
  'firstHopCustomRecords'?: ({[key: number]: Buffer | Uint8Array | string});
}

export interface SendPaymentRequest__Output {
  'dest': (Buffer);
  'amt': (string);
  'paymentHash': (Buffer);
  'finalCltvDelta': (number);
  'paymentRequest': (string);
  'timeoutSeconds': (number);
  'feeLimitSat': (string);
  'outgoingChanId': (string);
  'cltvLimit': (number);
  'routeHints': (_lnrpc_RouteHint__Output)[];
  'destCustomRecords': ({[key: number]: Buffer});
  'amtMsat': (string);
  'feeLimitMsat': (string);
  'lastHopPubkey': (Buffer);
  'allowSelfPayment': (boolean);
  'destFeatures': (_lnrpc_FeatureBit__Output)[];
  'maxParts': (number);
  'noInflightUpdates': (boolean);
  'outgoingChanIds': (string)[];
  'paymentAddr': (Buffer);
  'maxShardSizeMsat': (string);
  'amp': (boolean);
  'timePref': (number);
  'cancelable': (boolean);
  'firstHopCustomRecords': ({[key: number]: Buffer});
}
