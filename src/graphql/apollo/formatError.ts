import {ErrorCodes} from '@/utils/Errors'
import * as Sentry from '@sentry/node'
import {ValidationError} from 'class-validator'
import {GraphQLError} from 'graphql'
import {flow, pick} from 'lodash'
import {AnyObject} from 'tsdef'
import {MiddlewareFn} from 'type-graphql'
import {log} from '../../utils/libsExport'

export function formatError(err: GraphQLError) {
	Sentry.captureException(err)
	
	return flow(ValidatorError/*, typeormError*/, ExpectedError)(err)
}


function typeormError(err: any) {
	console.log(err)
	if (err.detail) return err.detail
	return err
	
}

const isExpectedError = (err: AnyObject) =>
	Object.keys(ErrorCodes).includes(err.extensions?.code)

function ExpectedError(err: GraphQLError) {
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

export const ErrorInterceptor2: MiddlewareFn = async (action, next) => {
	try {
		return await next()
	} catch (e) {
		if (e.constructor.name === 'ExpectedError') {
			log.error('Constructor ' + e.constructor.name)
			throw new Error('Intercepted: ' + e.message)
		} else {
			console.log(e)
			throw new Error('Uncaught error, ID has been recorded: ')
		}
	}
}
