// Original file: protos/lightning.proto

import type { AddressType as _lnrpc_AddressType, AddressType__Output as _lnrpc_AddressType__Output } from '../lnrpc/AddressType';
import type { OutPoint as _lnrpc_OutPoint, OutPoint__Output as _lnrpc_OutPoint__Output } from '../lnrpc/OutPoint';
import type { Long } from '@grpc/proto-loader';

export interface Utxo {
  'addressType'?: (_lnrpc_AddressType);
  'address'?: (string);
  'amountSat'?: (number | string | Long);
  'pkScript'?: (string);
  'outpoint'?: (_lnrpc_OutPoint | null);
  'confirmations'?: (number | string | Long);
}

export interface Utxo__Output {
  'addressType': (_lnrpc_AddressType__Output);
  'address': (string);
  'amountSat': (string);
  'pkScript': (string);
  'outpoint': (_lnrpc_OutPoint__Output | null);
  'confirmations': (string);
}
