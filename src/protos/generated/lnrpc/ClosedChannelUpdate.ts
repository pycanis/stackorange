// Original file: protos/lightning.proto

import type { ChannelPoint as _lnrpc_ChannelPoint, ChannelPoint__Output as _lnrpc_ChannelPoint__Output } from '../lnrpc/ChannelPoint';
import type { Long } from '@grpc/proto-loader';

export interface ClosedChannelUpdate {
  'chanId'?: (number | string | Long);
  'capacity'?: (number | string | Long);
  'closedHeight'?: (number);
  'chanPoint'?: (_lnrpc_ChannelPoint | null);
}

export interface ClosedChannelUpdate__Output {
  'chanId': (string);
  'capacity': (string);
  'closedHeight': (number);
  'chanPoint': (_lnrpc_ChannelPoint__Output | null);
}
