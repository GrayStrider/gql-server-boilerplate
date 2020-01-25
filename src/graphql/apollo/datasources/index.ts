import CatFactsAPI from '@/graphql/apollo/datasources/CatFacts'

export default function dataSources () {

	return {
		catFacts: new CatFactsAPI(),
	}

}
