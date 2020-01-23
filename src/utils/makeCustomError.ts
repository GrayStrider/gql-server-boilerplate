import {AnyObject} from 'tsdef'
import {ErrorCodes} from '@/utils/Errors'
import {isEmpty} from 'ramda'
import {ApolloError} from 'apollo-server-errors'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IExpectedError {
	details?: AnyObject | string
}

export function makeCustomError (
	code: ErrorCodes, defaultMessage: string, defaultDetails?: AnyObject | string
) {
	
	return class ExpectedError extends ApolloError implements IExpectedError {
		
		public details?: AnyObject | string
		
		constructor (message?: string, details?: AnyObject | string) {
			
			super(message ?? defaultMessage, code)
			if (isEmpty(defaultDetails)) this.details = defaultDetails
			
		}
		
	}
	
}

