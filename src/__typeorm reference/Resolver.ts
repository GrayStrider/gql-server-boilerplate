import {Contains} from 'class-validator'
import {Args, ArgsType, Field, Mutation, Query, Resolver} from 'type-graphql'
import {validate, validateAndSave} from '../utils/validator'
import {Child} from './ChildEntity'
import {ExampleEntity} from './Entity'

@ArgsType()
export class ExampleEntityNewInput implements Partial<ExampleEntity> {
	@Field()
	validatedName: string
	
	@Field()
	manyOptions: string
}

@ArgsType()
export class ExampleEntitySearchInput implements Partial<ExampleEntity> {
	@Field()
	// validating here only makes sense in cases where input args class doesn't implement an entity, since validation rules are alrady present in entity itself
	@Contains('123')
	validatedName: string
}


@Resolver()
export class ExampleEntityResolver {
	@Mutation(returns => ExampleEntity)
	async exampleEntityCreate(@Args() props: ExampleEntityNewInput) {
		return await ExampleEntity.create({
			isActive: 3 > 2,
			children: [
				Child.create({
					data: 'created'
				})
			],
			...props
		}).save()
		
	}
	
	@Query(returns => [ExampleEntity])
	async exampleEntity(@Args()props: ExampleEntitySearchInput) {
		await validate(props)
		return ExampleEntity.find(props)
	}
	
	@Mutation(returns => ExampleEntity)
	async exampleEntityCreateWithValidation(@Args() props: ExampleEntityNewInput) {
		return await validateAndSave(ExampleEntity.create(props))
	}
	
	@Query(returns => [Child])
	async children() {
		return await Child.find({relations: ["parent"]})
	}
}


