// Original file: protos/router.proto

import type { Long } from '@grpc/proto-loader';

export interface AprioriParameters {
  'halfLifeSeconds'?: (number | string | Long);
  'hopProbability'?: (number | string);
  'weight'?: (number | string);
  'capacityFraction'?: (number | string);
}

export interface AprioriParameters__Output {
  'halfLifeSeconds': (string);
  'hopProbability': (number);
  'weight': (number);
  'capacityFraction': (number);
}
