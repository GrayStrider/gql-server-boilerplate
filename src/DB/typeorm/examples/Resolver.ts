import {Args, Query, Resolver} from 'type-graphql'
import {ExampleEntity, Child, ExampleEntitySearchInput} from '@/DB/typeorm/examples/index'


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


