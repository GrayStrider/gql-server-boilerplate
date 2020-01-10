import {ApolloError} from 'apollo-server'
import {truncate} from 'lodash'
import {AnyObject} from 'tsdef'

export enum ErrorCodes {
	'VALIDATION_ERROR'= 'VALIDATION_ERROR',
	'NOT_FOUND'= 'NOT_FOUND',
	'UNATHORIZED' = 'UNATHORIZED'
}

export const Errors = {
	Validation: CustomError(ErrorCodes.VALIDATION_ERROR, 'Unspecified validation error'),
	NotFound  : CustomError(ErrorCodes.NOT_FOUND, 'Object not found'),
	Authenfication: CustomError(ErrorCodes.UNATHORIZED, 'Unathorized to perform requested action')
}

function CustomError(code: string, defaultMessage: string, details?: AnyObject | string) {
	return class ExpectedError extends ApolloError {
		constructor(message: string = defaultMessage, public details?:AnyObject | string =  details) {
			super(message, code)
		}
	}
}

export const userNotFoundError = (id: string) =>
	new Errors.NotFound(`User ${truncate(id, {length: 10})} not found`)
