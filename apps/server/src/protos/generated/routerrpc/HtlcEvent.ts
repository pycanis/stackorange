// Original file: protos/router.proto

import type { ForwardEvent as _routerrpc_ForwardEvent, ForwardEvent__Output as _routerrpc_ForwardEvent__Output } from '../routerrpc/ForwardEvent';
import type { ForwardFailEvent as _routerrpc_ForwardFailEvent, ForwardFailEvent__Output as _routerrpc_ForwardFailEvent__Output } from '../routerrpc/ForwardFailEvent';
import type { SettleEvent as _routerrpc_SettleEvent, SettleEvent__Output as _routerrpc_SettleEvent__Output } from '../routerrpc/SettleEvent';
import type { LinkFailEvent as _routerrpc_LinkFailEvent, LinkFailEvent__Output as _routerrpc_LinkFailEvent__Output } from '../routerrpc/LinkFailEvent';
import type { SubscribedEvent as _routerrpc_SubscribedEvent, SubscribedEvent__Output as _routerrpc_SubscribedEvent__Output } from '../routerrpc/SubscribedEvent';
import type { FinalHtlcEvent as _routerrpc_FinalHtlcEvent, FinalHtlcEvent__Output as _routerrpc_FinalHtlcEvent__Output } from '../routerrpc/FinalHtlcEvent';
import type { Long } from '@grpc/proto-loader';

// Original file: protos/router.proto

export const _routerrpc_HtlcEvent_EventType = {
  UNKNOWN: 'UNKNOWN',
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  FORWARD: 'FORWARD',
} as const;

export type _routerrpc_HtlcEvent_EventType =
  | 'UNKNOWN'
  | 0
  | 'SEND'
  | 1
  | 'RECEIVE'
  | 2
  | 'FORWARD'
  | 3

export type _routerrpc_HtlcEvent_EventType__Output = typeof _routerrpc_HtlcEvent_EventType[keyof typeof _routerrpc_HtlcEvent_EventType]

export interface HtlcEvent {
  'incomingChannelId'?: (number | string | Long);
  'outgoingChannelId'?: (number | string | Long);
  'incomingHtlcId'?: (number | string | Long);
  'outgoingHtlcId'?: (number | string | Long);
  'timestampNs'?: (number | string | Long);
  'eventType'?: (_routerrpc_HtlcEvent_EventType);
  'forwardEvent'?: (_routerrpc_ForwardEvent | null);
  'forwardFailEvent'?: (_routerrpc_ForwardFailEvent | null);
  'settleEvent'?: (_routerrpc_SettleEvent | null);
  'linkFailEvent'?: (_routerrpc_LinkFailEvent | null);
  'subscribedEvent'?: (_routerrpc_SubscribedEvent | null);
  'finalHtlcEvent'?: (_routerrpc_FinalHtlcEvent | null);
  'event'?: "forwardEvent"|"forwardFailEvent"|"settleEvent"|"linkFailEvent"|"subscribedEvent"|"finalHtlcEvent";
}

export interface HtlcEvent__Output {
  'incomingChannelId': (string);
  'outgoingChannelId': (string);
  'incomingHtlcId': (string);
  'outgoingHtlcId': (string);
  'timestampNs': (string);
  'eventType': (_routerrpc_HtlcEvent_EventType__Output);
  'forwardEvent'?: (_routerrpc_ForwardEvent__Output | null);
  'forwardFailEvent'?: (_routerrpc_ForwardFailEvent__Output | null);
  'settleEvent'?: (_routerrpc_SettleEvent__Output | null);
  'linkFailEvent'?: (_routerrpc_LinkFailEvent__Output | null);
  'subscribedEvent'?: (_routerrpc_SubscribedEvent__Output | null);
  'finalHtlcEvent'?: (_routerrpc_FinalHtlcEvent__Output | null);
  'event': "forwardEvent"|"forwardFailEvent"|"settleEvent"|"linkFailEvent"|"subscribedEvent"|"finalHtlcEvent";
}
