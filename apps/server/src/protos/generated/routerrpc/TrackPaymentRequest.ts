// Original file: router.proto


export interface TrackPaymentRequest {
  'paymentHash'?: (Buffer | Uint8Array | string);
  'noInflightUpdates'?: (boolean);
}

export interface TrackPaymentRequest__Output {
  'paymentHash': (Buffer);
  'noInflightUpdates': (boolean);
}
