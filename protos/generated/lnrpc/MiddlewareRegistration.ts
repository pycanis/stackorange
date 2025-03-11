// Original file: protos/lightning.proto


export interface MiddlewareRegistration {
  'middlewareName'?: (string);
  'customMacaroonCaveatName'?: (string);
  'readOnlyMode'?: (boolean);
}

export interface MiddlewareRegistration__Output {
  'middlewareName': (string);
  'customMacaroonCaveatName': (string);
  'readOnlyMode': (boolean);
}
