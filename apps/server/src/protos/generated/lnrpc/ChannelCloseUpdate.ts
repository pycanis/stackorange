// Original file: lightning.proto

import type { CloseOutput as _lnrpc_CloseOutput, CloseOutput__Output as _lnrpc_CloseOutput__Output } from '../lnrpc/CloseOutput';

export interface ChannelCloseUpdate {
  'closingTxid'?: (Buffer | Uint8Array | string);
  'success'?: (boolean);
  'localCloseOutput'?: (_lnrpc_CloseOutput | null);
  'remoteCloseOutput'?: (_lnrpc_CloseOutput | null);
  'additionalOutputs'?: (_lnrpc_CloseOutput)[];
}

export interface ChannelCloseUpdate__Output {
  'closingTxid': (Buffer);
  'success': (boolean);
  'localCloseOutput': (_lnrpc_CloseOutput__Output | null);
  'remoteCloseOutput': (_lnrpc_CloseOutput__Output | null);
  'additionalOutputs': (_lnrpc_CloseOutput__Output)[];
}
