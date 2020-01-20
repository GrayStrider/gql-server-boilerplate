import {AnyObject} from 'tsdef'
import {ApolloError} from 'apollo-server'
import {ErrorCodes} from '@/utils/Errors'

export function makeCustomError(code: ErrorCodes, defaultMessage: string, details?: AnyObject | string) {
	return class ExpectedError extends ApolloError {
		constructor(message: string = defaultMessage, public details?: AnyObject | string) {
			super(message, code)
		}
	}
}
