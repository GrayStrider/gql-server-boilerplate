import {ApolloError} from 'apollo-server'
import {truncate} from 'lodash'

export const Errors = {
	Validation: CustomError('VALIDATION_ERROR', 'Unspecified validation error'),
	NotFound  : CustomError('NOT_FOUND', 'Object not found'),
}

function CustomError(code: string, defaultMessage: string) {
	return class ExpectedError extends ApolloError {
		constructor(message: string = defaultMessage) {
			super(message, code)
		}
	}
}

export const userNotFoundError = (id: string) =>
	new Errors.NotFound(`User ${truncate(id, {length: 10})} not found`)
