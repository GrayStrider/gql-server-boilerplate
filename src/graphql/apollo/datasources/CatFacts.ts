import { RESTDataSource } from 'apollo-datasource-rest'

// https://alexwohlbruck.github.io/cat-facts

interface CatFact {
	used: boolean
	source: string
	type: string
	deleted: boolean
	// eslint-disable-next-line @typescript-eslint/naming-convention
	_id: string
	updatedAt: string
	createdAt: string
	user: string
	text: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__v: number
	status: {
		verified: boolean
		sentCount: number
	}
}

export default class CatFactsAPI extends RESTDataSource {
	
	constructor () {
		
		super ()
		this.baseURL = 'https://cat-fact.herokuapp.com'
		
	}
	
	async getFact () {
		
		return this.get<CatFact> ('/facts/random')
		
	}
	
}
