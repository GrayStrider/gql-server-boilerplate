import {Args, ArgsType, Field, InputType, Mutation, Query, Resolver} from 'type-graphql'
import {ExampleEntity} from './Entity'

@ArgsType()
export class ExampleEntityNewInput {
	@Field()
	name: string
}

@Resolver()
export class ExampleEntityResolver {
	@Mutation(returns => ExampleEntity)
	async exampleEntityCreate(@Args() props: ExampleEntityNewInput) {
		return await ExampleEntity.create({
			isActive: 3 > 2,
			...props
		}).save()
		
	}
	
	@Query(returns => [ExampleEntity])
	async exampleEntity() {
		return ExampleEntity.find()
	}
}
