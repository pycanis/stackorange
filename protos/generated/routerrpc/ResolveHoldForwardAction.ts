// Original file: protos/router.proto

export const ResolveHoldForwardAction = {
  SETTLE: 'SETTLE',
  FAIL: 'FAIL',
  RESUME: 'RESUME',
  RESUME_MODIFIED: 'RESUME_MODIFIED',
} as const;

export type ResolveHoldForwardAction =
  | 'SETTLE'
  | 0
  | 'FAIL'
  | 1
  | 'RESUME'
  | 2
  | 'RESUME_MODIFIED'
  | 3

export type ResolveHoldForwardAction__Output = typeof ResolveHoldForwardAction[keyof typeof ResolveHoldForwardAction]
