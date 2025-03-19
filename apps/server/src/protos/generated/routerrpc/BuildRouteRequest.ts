// Original file: protos/router.proto

import type { Long } from '@grpc/proto-loader';

export interface BuildRouteRequest {
  'amtMsat'?: (number | string | Long);
  'finalCltvDelta'?: (number);
  'outgoingChanId'?: (number | string | Long);
  'hopPubkeys'?: (Buffer | Uint8Array | string)[];
  'paymentAddr'?: (Buffer | Uint8Array | string);
  'firstHopCustomRecords'?: ({[key: number]: Buffer | Uint8Array | string});
}

export interface BuildRouteRequest__Output {
  'amtMsat': (string);
  'finalCltvDelta': (number);
  'outgoingChanId': (string);
  'hopPubkeys': (Buffer)[];
  'paymentAddr': (Buffer);
  'firstHopCustomRecords': ({[key: number]: Buffer});
}
