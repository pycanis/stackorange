// Original file: lightning.proto

import type { CoinSelectionStrategy as _lnrpc_CoinSelectionStrategy, CoinSelectionStrategy__Output as _lnrpc_CoinSelectionStrategy__Output } from '../lnrpc/CoinSelectionStrategy';
import type { OutPoint as _lnrpc_OutPoint, OutPoint__Output as _lnrpc_OutPoint__Output } from '../lnrpc/OutPoint';
import type { Long } from '@grpc/proto-loader';

export interface SendCoinsRequest {
  'addr'?: (string);
  'amount'?: (number | string | Long);
  'targetConf'?: (number);
  'satPerVbyte'?: (number | string | Long);
  'satPerByte'?: (number | string | Long);
  'sendAll'?: (boolean);
  'label'?: (string);
  'minConfs'?: (number);
  'spendUnconfirmed'?: (boolean);
  'coinSelectionStrategy'?: (_lnrpc_CoinSelectionStrategy);
  'outpoints'?: (_lnrpc_OutPoint)[];
}

export interface SendCoinsRequest__Output {
  'addr': (string);
  'amount': (string);
  'targetConf': (number);
  'satPerVbyte': (string);
  'satPerByte': (string);
  'sendAll': (boolean);
  'label': (string);
  'minConfs': (number);
  'spendUnconfirmed': (boolean);
  'coinSelectionStrategy': (_lnrpc_CoinSelectionStrategy__Output);
  'outpoints': (_lnrpc_OutPoint__Output)[];
}
