import {AnyObject} from 'tsdef'
import {ApolloError} from 'apollo-server'
import {ErrorCodes} from '@/utils/Errors'

export function makeCustomError(code: ErrorCodes, defaultMessage: string, defaultDetails?: AnyObject | string) {
	return class ExpectedError extends ApolloError {
		public details?: AnyObject | string
		constructor(message?: string, details?: AnyObject | string) {
			super(message ?? defaultMessage, code)
			if (defaultDetails) this.details = defaultDetails
		}
	}
}
