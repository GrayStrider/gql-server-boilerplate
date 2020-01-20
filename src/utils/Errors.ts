import {truncate} from 'lodash'
import {makeCustomError} from '@/utils/makeCustomError'

export enum ErrorCodes {
	'VALIDATION_ERROR' = 'VALIDATION_ERROR',
	'NOT_FOUND' = 'NOT_FOUND',
	'UNATHORIZED' = 'UNATHORIZED'
}

export const Errors = {
	Validation: makeCustomError(ErrorCodes.VALIDATION_ERROR, 'Unspecified validation error'),
	NotFound: makeCustomError(ErrorCodes.NOT_FOUND, 'Object not found'),
	Unathorized: makeCustomError(ErrorCodes.UNATHORIZED, 'Unathorized to perform requested action'),
	InvalidCredentials: makeCustomError(ErrorCodes.UNATHORIZED, 'Invalid credentials provided'),
}

export const userNotFoundError = (id: string) =>
	new Errors.NotFound(`User ${truncate(id, {length: 10})} not found`)
