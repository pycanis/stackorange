// Original file: protos/lightning.proto

export const FeatureBit = {
  DATALOSS_PROTECT_REQ: 'DATALOSS_PROTECT_REQ',
  DATALOSS_PROTECT_OPT: 'DATALOSS_PROTECT_OPT',
  INITIAL_ROUING_SYNC: 'INITIAL_ROUING_SYNC',
  UPFRONT_SHUTDOWN_SCRIPT_REQ: 'UPFRONT_SHUTDOWN_SCRIPT_REQ',
  UPFRONT_SHUTDOWN_SCRIPT_OPT: 'UPFRONT_SHUTDOWN_SCRIPT_OPT',
  GOSSIP_QUERIES_REQ: 'GOSSIP_QUERIES_REQ',
  GOSSIP_QUERIES_OPT: 'GOSSIP_QUERIES_OPT',
  TLV_ONION_REQ: 'TLV_ONION_REQ',
  TLV_ONION_OPT: 'TLV_ONION_OPT',
  EXT_GOSSIP_QUERIES_REQ: 'EXT_GOSSIP_QUERIES_REQ',
  EXT_GOSSIP_QUERIES_OPT: 'EXT_GOSSIP_QUERIES_OPT',
  STATIC_REMOTE_KEY_REQ: 'STATIC_REMOTE_KEY_REQ',
  STATIC_REMOTE_KEY_OPT: 'STATIC_REMOTE_KEY_OPT',
  PAYMENT_ADDR_REQ: 'PAYMENT_ADDR_REQ',
  PAYMENT_ADDR_OPT: 'PAYMENT_ADDR_OPT',
  MPP_REQ: 'MPP_REQ',
  MPP_OPT: 'MPP_OPT',
  WUMBO_CHANNELS_REQ: 'WUMBO_CHANNELS_REQ',
  WUMBO_CHANNELS_OPT: 'WUMBO_CHANNELS_OPT',
  ANCHORS_REQ: 'ANCHORS_REQ',
  ANCHORS_OPT: 'ANCHORS_OPT',
  ANCHORS_ZERO_FEE_HTLC_REQ: 'ANCHORS_ZERO_FEE_HTLC_REQ',
  ANCHORS_ZERO_FEE_HTLC_OPT: 'ANCHORS_ZERO_FEE_HTLC_OPT',
  ROUTE_BLINDING_REQUIRED: 'ROUTE_BLINDING_REQUIRED',
  ROUTE_BLINDING_OPTIONAL: 'ROUTE_BLINDING_OPTIONAL',
  AMP_REQ: 'AMP_REQ',
  AMP_OPT: 'AMP_OPT',
} as const;

export type FeatureBit =
  | 'DATALOSS_PROTECT_REQ'
  | 0
  | 'DATALOSS_PROTECT_OPT'
  | 1
  | 'INITIAL_ROUING_SYNC'
  | 3
  | 'UPFRONT_SHUTDOWN_SCRIPT_REQ'
  | 4
  | 'UPFRONT_SHUTDOWN_SCRIPT_OPT'
  | 5
  | 'GOSSIP_QUERIES_REQ'
  | 6
  | 'GOSSIP_QUERIES_OPT'
  | 7
  | 'TLV_ONION_REQ'
  | 8
  | 'TLV_ONION_OPT'
  | 9
  | 'EXT_GOSSIP_QUERIES_REQ'
  | 10
  | 'EXT_GOSSIP_QUERIES_OPT'
  | 11
  | 'STATIC_REMOTE_KEY_REQ'
  | 12
  | 'STATIC_REMOTE_KEY_OPT'
  | 13
  | 'PAYMENT_ADDR_REQ'
  | 14
  | 'PAYMENT_ADDR_OPT'
  | 15
  | 'MPP_REQ'
  | 16
  | 'MPP_OPT'
  | 17
  | 'WUMBO_CHANNELS_REQ'
  | 18
  | 'WUMBO_CHANNELS_OPT'
  | 19
  | 'ANCHORS_REQ'
  | 20
  | 'ANCHORS_OPT'
  | 21
  | 'ANCHORS_ZERO_FEE_HTLC_REQ'
  | 22
  | 'ANCHORS_ZERO_FEE_HTLC_OPT'
  | 23
  | 'ROUTE_BLINDING_REQUIRED'
  | 24
  | 'ROUTE_BLINDING_OPTIONAL'
  | 25
  | 'AMP_REQ'
  | 30
  | 'AMP_OPT'
  | 31

export type FeatureBit__Output = typeof FeatureBit[keyof typeof FeatureBit]
