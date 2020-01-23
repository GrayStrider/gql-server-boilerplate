import CatFactsAPI from '@/graphql/apollo/datasources/CatFacts'

export const dataSources = () => ({
	catFacts: new CatFactsAPI(),
})
