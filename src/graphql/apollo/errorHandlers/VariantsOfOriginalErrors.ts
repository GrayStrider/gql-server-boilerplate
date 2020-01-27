import {AnyObject} from 'tsdef'
import {GraphQLError} from 'graphql'

interface MyError extends Error {
	response: {
		status: string | number
		error: string
	}
}

function hasOriginalError (err: AnyObject): err is GraphQLError<MyError> {
	
	return Boolean(err.originalError.response)
	
}

export default function VariantsOfOriginalError (err: GraphQLError<MyError>) {
	
	if (hasOriginalError(err)) {
		
		const status = err.originalError?.name
		const message = err.originalError
		const details = err.extensions?.exception.response
		if (status === '404')
			return {message, status, details}
		
	}
	// TODO implement error fallthrough validation
	return err
	
}
