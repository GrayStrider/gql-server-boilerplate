import { GraphQLError } from 'graphql'
import { map, pick } from 'ramda'
import { ValidationError } from 'class-validator'
import { AnyObject } from 'tsdef'

interface GqlValidationError extends GraphQLError {
	validationErrors: ValidationError[]
}

function isValidationError (err: AnyObject): err is GqlValidationError {
	
	return Boolean (err.validationErrors)
	
}

export default function ValidatorError (err: GraphQLError<GqlValidationError>) {
	
	if (!isValidationError (err)) return err
	const errors = err.extensions?.exception.validationErrors
	return {
		message: err.message,
		errors: map (
			pick ([
				'property',
				'value',
				'constraints'
			])
		) (errors)
	}
	
}
