import {CatFactsAPI} from './CatFacts'

export const dataSources = () => ({
	catFacts: new CatFactsAPI(),
})
