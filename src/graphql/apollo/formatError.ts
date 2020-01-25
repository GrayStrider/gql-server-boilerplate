import {GraphQLError} from 'graphql'
import {flow} from 'lodash'
import {VariantsOfOriginalError, ValidatorError, ExpectedError} from '@/graphql/apollo/errorHandlers'


export default function formatError (err: GraphQLError) {
	
	return flow(
		ValidatorError, ExpectedError, VariantsOfOriginalError
	)(err)
	
}

