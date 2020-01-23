import {GraphQLError} from 'graphql'
import {AnyObject} from 'tsdef'
import {ValidationError} from 'class-validator'
import {map, pick} from 'ramda'
import {ErrorCodes} from '@/utils/Errors'
import {IExpectedError} from '@/utils'

const isExpectedError = (err: AnyObject) =>
	Object.keys(ErrorCodes).includes(err.extensions?.code)

function ExpectedError (err: GraphQLError<IExpectedError>) {
	
	if (isExpectedError(err)) {
		
		const {details} = err.extensions?.exception
		const res: AnyObject = {message: err.message}
		
		if (Boolean(details)) res.details = details
		return res as GraphQLError
		
	}
	return err
	
}

interface GqlValidationError extends GraphQLError {
	validationErrors: ValidationError[]
}

function isValidationError (err: AnyObject): err is GqlValidationError {
	
	return Boolean(err.validationErrors)
	
}

function ValidatorError (err: GraphQLError<GqlValidationError>) {
	
	// TODO extend type
	if (!isValidationError(err)) return err
	const errors = err.extensions?.exception.validationErrors
	return {
		message: err.message,
		errors: map(
			pick([
				'property',
				'value',
				'constraints',
			])
		)(errors),
	}
	
}

interface MyError extends Error {
	response: {
		status: string | number
		error: string
	}
}

function hasOriginalError (err: AnyObject): err is GraphQLError<MyError> {
	
	return Boolean(err.originalError.response)
	
}


function VariantsOfOriginalError (err: GraphQLError<MyError>) {
	
	if (hasOriginalError(err)) {
		
		const status = err.originalError?.name
		const message = err.originalError
		const details = err.extensions?.exception.response
		if (status === '404')
			return {message, status}
		
	}
	// TODO implement error fallthrough validation
	return err
	
}

export {ExpectedError, ValidatorError, VariantsOfOriginalError}
