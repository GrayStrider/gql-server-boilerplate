import {Args, Query, Resolver} from 'type-graphql'
import {Child} from './entity/ChildEntity'
import {ExampleEntity} from './entity/Entity'
import {ExampleEntitySearchInput} from './Inputs'


@Resolver()
export class ExampleEntityResolver {

	@Query(returns => [ExampleEntity])
	exampleEntity (@Args()props: ExampleEntitySearchInput) {

		return ExampleEntity.find(props)

	}

	@Query(returns => [Child])
	children () {

		return Child.find({relations: ['parent']})

	}

}


