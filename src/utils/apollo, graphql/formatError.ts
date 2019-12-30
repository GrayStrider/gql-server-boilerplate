import * as Sentry from '@sentry/node'
import {ValidationError} from 'class-validator'
import {GraphQLError} from 'graphql'
import {flow, pick} from 'lodash'

export function formatError(err: GraphQLError) {
	Sentry.captureException(err)
	
	return flow(Augment, ValidatorError)(err)
}


function Augment(err: GraphQLError) {
	if (err.extensions?.code)
		err.extensions.code = 'LEL FUCKD'
	return err
}

function ValidatorError(err: GraphQLError) {
	const errors: ValidationError[] = err.extensions?.exception?.validationErrors
	if (errors) {
		return {
			message: err.message,
			errors : errors.map((err) =>
				pick(err, 'property', 'value', 'constraints'))
		}
	}
	return err
}

