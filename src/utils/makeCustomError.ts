import {AnyObject} from 'tsdef'
import {isEmpty} from 'ramda'
import {ApolloError} from 'apollo-server-errors'
import {ErrorCodes} from '@/utils/Errors'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IExpectedError {
	details?: AnyObject | string
}

function makeCustomError (
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

export {makeCustomError, IExpectedError}
