import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {Child} from './entity/ChildEntity'
import {ExampleEntity} from './entity/Entity'
import {ExampleEntityNewInput, ExampleEntitySearchInput} from './Inputs'


@Resolver()
export class ExampleEntityResolver {
	@Query(returns => [ExampleEntity])
	async exampleEntity(@Args()props: ExampleEntitySearchInput) {
		return ExampleEntity.find(props)
	}
	
	@Query(returns => [Child])
	async children() {
		return await Child.find({relations: ["parent"]})
	}
}


