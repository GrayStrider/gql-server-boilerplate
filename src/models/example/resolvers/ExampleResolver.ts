import {Resolver, Query, Mutation} from 'type-graphql'
import Example from '@/models/example/entity/Example'
import PaginatedExampleResponse from '@/graphql/type-graphql/paginatedResponse'

@Resolver()
export default class ExampleResolver {

	@Query(returns => [Example])
	async example (): Promise<Example[]> {

		return Example.find()
	
	}
	
	@Query(returns => PaginatedExampleResponse)
	async examplePaginated(): Promise<PaginatedExampleResponse> {
		
		return {
			items: await Example.find(),
			total: await Example.count(),
			hasMore: false
		}
	}
	
	
	@Mutation(returns => Example)
	async create () {

		return Example.create().save()
	
	}
	
	
}
