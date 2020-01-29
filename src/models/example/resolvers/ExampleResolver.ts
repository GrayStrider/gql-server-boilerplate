import {Resolver, Query, Mutation} from 'type-graphql'
import Example from '@/models/example/entity/Example'

@Resolver()
export default class ExampleResolver {

	@Query(returns => [Example])
	async example () {

		return Example.find()
	
	}
	
	@Mutation(returns => Example)
	async create () {

		return Example.create().save()
	
	}
	
	
}
