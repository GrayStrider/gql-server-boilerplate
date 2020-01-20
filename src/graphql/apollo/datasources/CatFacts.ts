import {RESTDataSource} from 'apollo-datasource-rest'

/**
 * https://alexwohlbruck.github.io/cat-facts
 */
export class CatFactsAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = 'https://cat-fact.herokuapp.com'
	}
	
	async getFact() {
		return this.get<CatFact>('/facts/random')
	}
	
}

interface CatFact {
	used: boolean
	source: string
	type: string
	deleted: boolean
	_id: string
	updatedAt: string
	createdAt: string
	user: string
	text: string
	__v: number
	status: {
		verified: boolean
		sentCount: number
	}
}
