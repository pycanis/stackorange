// Original file: protos/lightning.proto

import type { RouteHint as _lnrpc_RouteHint, RouteHint__Output as _lnrpc_RouteHint__Output } from '../lnrpc/RouteHint';
import type { InvoiceHTLC as _lnrpc_InvoiceHTLC, InvoiceHTLC__Output as _lnrpc_InvoiceHTLC__Output } from '../lnrpc/InvoiceHTLC';
import type { Feature as _lnrpc_Feature, Feature__Output as _lnrpc_Feature__Output } from '../lnrpc/Feature';
import type { AMPInvoiceState as _lnrpc_AMPInvoiceState, AMPInvoiceState__Output as _lnrpc_AMPInvoiceState__Output } from '../lnrpc/AMPInvoiceState';
import type { BlindedPathConfig as _lnrpc_BlindedPathConfig, BlindedPathConfig__Output as _lnrpc_BlindedPathConfig__Output } from '../lnrpc/BlindedPathConfig';
import type { Long } from '@grpc/proto-loader';

// Original file: protos/lightning.proto

export const _lnrpc_Invoice_InvoiceState = {
  OPEN: 'OPEN',
  SETTLED: 'SETTLED',
  CANCELED: 'CANCELED',
  ACCEPTED: 'ACCEPTED',
} as const;

export type _lnrpc_Invoice_InvoiceState =
  | 'OPEN'
  | 0
  | 'SETTLED'
  | 1
  | 'CANCELED'
  | 2
  | 'ACCEPTED'
  | 3

export type _lnrpc_Invoice_InvoiceState__Output = typeof _lnrpc_Invoice_InvoiceState[keyof typeof _lnrpc_Invoice_InvoiceState]

export interface Invoice {
  'memo'?: (string);
  'rPreimage'?: (Buffer | Uint8Array | string);
  'rHash'?: (Buffer | Uint8Array | string);
  'value'?: (number | string | Long);
  'settled'?: (boolean);
  'creationDate'?: (number | string | Long);
  'settleDate'?: (number | string | Long);
  'paymentRequest'?: (string);
  'descriptionHash'?: (Buffer | Uint8Array | string);
  'expiry'?: (number | string | Long);
  'fallbackAddr'?: (string);
  'cltvExpiry'?: (number | string | Long);
  'routeHints'?: (_lnrpc_RouteHint)[];
  'private'?: (boolean);
  'addIndex'?: (number | string | Long);
  'settleIndex'?: (number | string | Long);
  'amtPaid'?: (number | string | Long);
  'amtPaidSat'?: (number | string | Long);
  'amtPaidMsat'?: (number | string | Long);
  'state'?: (_lnrpc_Invoice_InvoiceState);
  'htlcs'?: (_lnrpc_InvoiceHTLC)[];
  'valueMsat'?: (number | string | Long);
  'features'?: ({[key: number]: _lnrpc_Feature});
  'isKeysend'?: (boolean);
  'paymentAddr'?: (Buffer | Uint8Array | string);
  'isAmp'?: (boolean);
  'ampInvoiceState'?: ({[key: string]: _lnrpc_AMPInvoiceState});
  'isBlinded'?: (boolean);
  'blindedPathConfig'?: (_lnrpc_BlindedPathConfig | null);
}

export interface Invoice__Output {
  'memo': (string);
  'rPreimage': (Buffer);
  'rHash': (Buffer);
  'value': (string);
  'settled': (boolean);
  'creationDate': (string);
  'settleDate': (string);
  'paymentRequest': (string);
  'descriptionHash': (Buffer);
  'expiry': (string);
  'fallbackAddr': (string);
  'cltvExpiry': (string);
  'routeHints': (_lnrpc_RouteHint__Output)[];
  'private': (boolean);
  'addIndex': (string);
  'settleIndex': (string);
  'amtPaid': (string);
  'amtPaidSat': (string);
  'amtPaidMsat': (string);
  'state': (_lnrpc_Invoice_InvoiceState__Output);
  'htlcs': (_lnrpc_InvoiceHTLC__Output)[];
  'valueMsat': (string);
  'features': ({[key: number]: _lnrpc_Feature__Output});
  'isKeysend': (boolean);
  'paymentAddr': (Buffer);
  'isAmp': (boolean);
  'ampInvoiceState': ({[key: string]: _lnrpc_AMPInvoiceState__Output});
  'isBlinded': (boolean);
  'blindedPathConfig': (_lnrpc_BlindedPathConfig__Output | null);
}
