import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {validate, validateAndSave} from '../utils/type-graphql/validator'
import {Child} from './ChildEntity'
import {ExampleEntity} from './Entity'
import {ExampleEntityNewInput, ExampleEntitySearchInput} from './Inputs'


@Resolver()
export class ExampleEntityResolver {
	@Query(returns => [ExampleEntity])
	async exampleEntity(@Args()props: ExampleEntitySearchInput) {
		await validate(props)
		return ExampleEntity.find(props)
	}
	
	@Mutation(returns => ExampleEntity)
	async exampleEntityCreateWithValidation(@Args() props: ExampleEntityNewInput) {
		return await validateAndSave(ExampleEntity.create({
			// children: [
			// 	Child.create({
			// 		data: 'created'
			// 	})
			// ],
			...props
		}))
	}
	
	@Query(returns => [Child])
	async children() {
		return await Child.find({relations: ["parent"]})
	}
}


