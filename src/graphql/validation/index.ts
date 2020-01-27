import queryComplexity, {fieldExtensionsEstimator, simpleEstimator} from 'graphql-query-complexity'

export default function complexityValidator () {

	return queryComplexity({
		// The maximum allowed query complexity, queries above this threshold will be rejected
		maximumComplexity: 8,
		
		/*
		 * The query variables. This is needed because the variables are not available
		 * in the visitor of the graphql-js library
		 */
		variables: {},
		
		/*
		 * Optional callback function to retrieve the determined query complexity
		 * Will be invoked weather the query is rejected or not
		 * This can be used for logging or to implement rate limiting
		 */
		onComplete: (complexity: number) => {
			
			console.log('Query Complexity:', complexity)
			
		},
		estimators: [
			fieldExtensionsEstimator(), simpleEstimator({
				defaultComplexity: 1,
			}),
		],
	})

}
