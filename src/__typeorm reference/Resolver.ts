import {Args, ArgsType, Field, Mutation, Query, Resolver} from 'type-graphql'
import {validateAndSave} from '../utils/validator'
import {ExampleEntity} from './Entity'

@ArgsType()
export class ExampleEntityNewInput implements Partial<ExampleEntity> {
	@Field()
	validatedName: string
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
	
	@Mutation(returns => ExampleEntity)
	async exampleEntityCreateWithValidation(@Args() props: ExampleEntityNewInput) {
		return await validateAndSave(ExampleEntity.create(props))
	}
}

