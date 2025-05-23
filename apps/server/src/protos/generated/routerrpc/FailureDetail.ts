// Original file: router.proto

export const FailureDetail = {
  UNKNOWN: 'UNKNOWN',
  NO_DETAIL: 'NO_DETAIL',
  ONION_DECODE: 'ONION_DECODE',
  LINK_NOT_ELIGIBLE: 'LINK_NOT_ELIGIBLE',
  ON_CHAIN_TIMEOUT: 'ON_CHAIN_TIMEOUT',
  HTLC_EXCEEDS_MAX: 'HTLC_EXCEEDS_MAX',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  INCOMPLETE_FORWARD: 'INCOMPLETE_FORWARD',
  HTLC_ADD_FAILED: 'HTLC_ADD_FAILED',
  FORWARDS_DISABLED: 'FORWARDS_DISABLED',
  INVOICE_CANCELED: 'INVOICE_CANCELED',
  INVOICE_UNDERPAID: 'INVOICE_UNDERPAID',
  INVOICE_EXPIRY_TOO_SOON: 'INVOICE_EXPIRY_TOO_SOON',
  INVOICE_NOT_OPEN: 'INVOICE_NOT_OPEN',
  MPP_INVOICE_TIMEOUT: 'MPP_INVOICE_TIMEOUT',
  ADDRESS_MISMATCH: 'ADDRESS_MISMATCH',
  SET_TOTAL_MISMATCH: 'SET_TOTAL_MISMATCH',
  SET_TOTAL_TOO_LOW: 'SET_TOTAL_TOO_LOW',
  SET_OVERPAID: 'SET_OVERPAID',
  UNKNOWN_INVOICE: 'UNKNOWN_INVOICE',
  INVALID_KEYSEND: 'INVALID_KEYSEND',
  MPP_IN_PROGRESS: 'MPP_IN_PROGRESS',
  CIRCULAR_ROUTE: 'CIRCULAR_ROUTE',
} as const;

export type FailureDetail =
  | 'UNKNOWN'
  | 0
  | 'NO_DETAIL'
  | 1
  | 'ONION_DECODE'
  | 2
  | 'LINK_NOT_ELIGIBLE'
  | 3
  | 'ON_CHAIN_TIMEOUT'
  | 4
  | 'HTLC_EXCEEDS_MAX'
  | 5
  | 'INSUFFICIENT_BALANCE'
  | 6
  | 'INCOMPLETE_FORWARD'
  | 7
  | 'HTLC_ADD_FAILED'
  | 8
  | 'FORWARDS_DISABLED'
  | 9
  | 'INVOICE_CANCELED'
  | 10
  | 'INVOICE_UNDERPAID'
  | 11
  | 'INVOICE_EXPIRY_TOO_SOON'
  | 12
  | 'INVOICE_NOT_OPEN'
  | 13
  | 'MPP_INVOICE_TIMEOUT'
  | 14
  | 'ADDRESS_MISMATCH'
  | 15
  | 'SET_TOTAL_MISMATCH'
  | 16
  | 'SET_TOTAL_TOO_LOW'
  | 17
  | 'SET_OVERPAID'
  | 18
  | 'UNKNOWN_INVOICE'
  | 19
  | 'INVALID_KEYSEND'
  | 20
  | 'MPP_IN_PROGRESS'
  | 21
  | 'CIRCULAR_ROUTE'
  | 22

export type FailureDetail__Output = typeof FailureDetail[keyof typeof FailureDetail]
