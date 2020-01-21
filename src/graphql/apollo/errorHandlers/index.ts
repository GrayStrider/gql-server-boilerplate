import {GraphQLError} from 'graphql'
import {AnyObject} from 'tsdef'
import {ErrorCodes} from '@/utils/Errors'
import {ValidationError} from 'class-validator'
import {pick} from 'lodash'
import {Maybe} from 'type-graphql'

const isExpectedError = (err: AnyObject) =>
	Object.keys(ErrorCodes).includes(err.extensions?.code)

export function ExpectedError (err: GraphQLError) {

	if (isExpectedError(err)) {

		const {details} = err.extensions?.exception
		const res: AnyObject = {message: err.message}

		if (details) res.details = details
		return res as GraphQLError

	}
	return err

}

export function ValidatorError (err: GraphQLError) {

	const errors: ValidationError[] = err.extensions?.exception?.validationErrors
	if (errors) return {
		message: err.message,
		errors: errors.map(e =>
			pick(
				e, 'property', 'value', 'constraints'
			)),
	}

	return err

}

export function VariantsOfOriginalError (err: GraphQLError) {

	const origError: Maybe<MyError> = err.originalError
	const status = origError?.response?.status
	const message = origError?.response?.error
	if (status === 404)
		return {message, status}

	// TODO implement error fallthrough validation
	return err

}

interface MyError extends Error {
	response?: {
		status?: number
		error?: string
	}
}
