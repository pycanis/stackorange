// Original file: protos/lightning.proto

import type { Amount as _lnrpc_Amount, Amount__Output as _lnrpc_Amount__Output } from '../lnrpc/Amount';
import type { Long } from '@grpc/proto-loader';

export interface ChannelBalanceResponse {
  'balance'?: (number | string | Long);
  'pendingOpenBalance'?: (number | string | Long);
  'localBalance'?: (_lnrpc_Amount | null);
  'remoteBalance'?: (_lnrpc_Amount | null);
  'unsettledLocalBalance'?: (_lnrpc_Amount | null);
  'unsettledRemoteBalance'?: (_lnrpc_Amount | null);
  'pendingOpenLocalBalance'?: (_lnrpc_Amount | null);
  'pendingOpenRemoteBalance'?: (_lnrpc_Amount | null);
  'customChannelData'?: (Buffer | Uint8Array | string);
}

export interface ChannelBalanceResponse__Output {
  'balance': (string);
  'pendingOpenBalance': (string);
  'localBalance': (_lnrpc_Amount__Output | null);
  'remoteBalance': (_lnrpc_Amount__Output | null);
  'unsettledLocalBalance': (_lnrpc_Amount__Output | null);
  'unsettledRemoteBalance': (_lnrpc_Amount__Output | null);
  'pendingOpenLocalBalance': (_lnrpc_Amount__Output | null);
  'pendingOpenRemoteBalance': (_lnrpc_Amount__Output | null);
  'customChannelData': (Buffer);
}
