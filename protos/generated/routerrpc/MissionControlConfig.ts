// Original file: protos/router.proto

import type { AprioriParameters as _routerrpc_AprioriParameters, AprioriParameters__Output as _routerrpc_AprioriParameters__Output } from '../routerrpc/AprioriParameters';
import type { BimodalParameters as _routerrpc_BimodalParameters, BimodalParameters__Output as _routerrpc_BimodalParameters__Output } from '../routerrpc/BimodalParameters';
import type { Long } from '@grpc/proto-loader';

// Original file: protos/router.proto

export const _routerrpc_MissionControlConfig_ProbabilityModel = {
  APRIORI: 'APRIORI',
  BIMODAL: 'BIMODAL',
} as const;

export type _routerrpc_MissionControlConfig_ProbabilityModel =
  | 'APRIORI'
  | 0
  | 'BIMODAL'
  | 1

export type _routerrpc_MissionControlConfig_ProbabilityModel__Output = typeof _routerrpc_MissionControlConfig_ProbabilityModel[keyof typeof _routerrpc_MissionControlConfig_ProbabilityModel]

export interface MissionControlConfig {
  'halfLifeSeconds'?: (number | string | Long);
  'hopProbability'?: (number | string);
  'weight'?: (number | string);
  'maximumPaymentResults'?: (number);
  'minimumFailureRelaxInterval'?: (number | string | Long);
  'model'?: (_routerrpc_MissionControlConfig_ProbabilityModel);
  'apriori'?: (_routerrpc_AprioriParameters | null);
  'bimodal'?: (_routerrpc_BimodalParameters | null);
  'EstimatorConfig'?: "apriori"|"bimodal";
}

export interface MissionControlConfig__Output {
  'halfLifeSeconds': (string);
  'hopProbability': (number);
  'weight': (number);
  'maximumPaymentResults': (number);
  'minimumFailureRelaxInterval': (string);
  'model': (_routerrpc_MissionControlConfig_ProbabilityModel__Output);
  'apriori'?: (_routerrpc_AprioriParameters__Output | null);
  'bimodal'?: (_routerrpc_BimodalParameters__Output | null);
  'EstimatorConfig': "apriori"|"bimodal";
}
