import { GraphQLError } from 'graphql'
import { AnyObject } from 'tsdef'
import { IExpectedError, ErrorCodes } from '@/utils'

const isExpectedError = (err: AnyObject) =>
	Object.keys (ErrorCodes).includes (err.extensions?.code)

export default function ExpectedError (err: GraphQLError<IExpectedError>) {
	
	if (isExpectedError (err)) {
		
		const { details } = err.extensions?.exception
		const res: AnyObject = { message: err.message }
		
		if (Boolean (details)) res.details = details
		return res as GraphQLError
		
	}
	return err
	
}

