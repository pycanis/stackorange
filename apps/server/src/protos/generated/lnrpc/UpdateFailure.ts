// Original file: lightning.proto

export const UpdateFailure = {
  UPDATE_FAILURE_UNKNOWN: 'UPDATE_FAILURE_UNKNOWN',
  UPDATE_FAILURE_PENDING: 'UPDATE_FAILURE_PENDING',
  UPDATE_FAILURE_NOT_FOUND: 'UPDATE_FAILURE_NOT_FOUND',
  UPDATE_FAILURE_INTERNAL_ERR: 'UPDATE_FAILURE_INTERNAL_ERR',
  UPDATE_FAILURE_INVALID_PARAMETER: 'UPDATE_FAILURE_INVALID_PARAMETER',
} as const;

export type UpdateFailure =
  | 'UPDATE_FAILURE_UNKNOWN'
  | 0
  | 'UPDATE_FAILURE_PENDING'
  | 1
  | 'UPDATE_FAILURE_NOT_FOUND'
  | 2
  | 'UPDATE_FAILURE_INTERNAL_ERR'
  | 3
  | 'UPDATE_FAILURE_INVALID_PARAMETER'
  | 4

export type UpdateFailure__Output = typeof UpdateFailure[keyof typeof UpdateFailure]
