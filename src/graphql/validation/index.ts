import queryComplexity, {fieldExtensionsEstimator, simpleEstimator} from 'graphql-query-complexity'

export const complexityValidator = () =>
	queryComplexity({
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
			// Using fieldConfigEstimator is mandatory to make it work with type-graphql
			fieldExtensionsEstimator(),

			/*
			 * This will assign each field a complexity of 1 if no other estimator
			 * returned a value. We can define the default value for field not explicitly annotated
			 */
			simpleEstimator({
				defaultComplexity: 1,
			}),
		],
	})
