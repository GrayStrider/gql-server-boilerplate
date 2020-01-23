import CatFactsAPI from '@/graphql/apollo/datasources/CatFacts'

const dataSources = () => ({
	catFacts: new CatFactsAPI(),
})

export default dataSources
