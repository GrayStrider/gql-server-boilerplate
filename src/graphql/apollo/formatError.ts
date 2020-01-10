import {ErrorCodes} from '@/utils/Errors'
import {ValidationError} from 'class-validator'
import {GraphQLError} from 'graphql'
import {flow, pick} from 'lodash'
import {AnyObject} from 'tsdef'

export function formatError(err: GraphQLError) {
	return flow(ValidatorError, ExpectedError)(err)
}

function ExpectedError(err: GraphQLError) {
	const isExpectedError = (err: AnyObject) =>
		Object.keys(ErrorCodes).includes(err.extensions?.code)
	
	if (isExpectedError(err)) {
		const {details} = err.extensions?.exception
		const res: AnyObject = {message: err.message}
		
		if (details) res.details = details
		return res as GraphQLError
	}
	return err
}
function ValidatorError(err: GraphQLError) {
	const errors: ValidationError[] = err.extensions?.exception?.validationErrors
	if (errors) {
		return {
			message: err.message,
			errors: errors.map((err) =>
				pick(err, 'property', 'value', 'constraints')),
		}
	}
	return err
}
