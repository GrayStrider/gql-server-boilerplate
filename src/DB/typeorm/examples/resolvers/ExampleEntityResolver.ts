import {Resolver, Query, Args} from 'type-graphql'
import {ExampleEntity, Child} from '@/DB/typeorm/examples'
import {ExampleEntitySearchInput} from '@/DB/typeorm/examples/inputs'

@Resolver()
export default class ExampleEntityResolver {
	
	@Query(returns => [ExampleEntity])
	async exampleEntity (@Args()props: ExampleEntitySearchInput) {
		
		return ExampleEntity.find(props)
		
	}
	
	@Query(returns => [Child])
	async children () {
		
		return Child.find({relations: ['parent']})
		
	}
	
}
