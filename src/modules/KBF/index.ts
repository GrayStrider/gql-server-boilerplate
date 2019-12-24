import {Max} from 'class-validator'
import {Args, ArgsType, Field, Mutation, Query, Resolver} from 'type-graphql'
import {Like} from 'typeorm'
import {Task} from '../../entity/KBF/Task'

@ArgsType()
class NewTaskInput implements Partial<Task> {
	@Field()
	title: string
	
	// on field nullable only applicable in the context of inputs
	@Field({nullable: true})
	description: string
}

@ArgsType()
class SearchTaskInput implements Partial<Task> {
	@Field({nullable: true})
	@Max(100)
	title: string
	
	@Field({nullable: true})
	description: string
	
	@Field({nullable: true})
	id: string
	
	@Field({nullable: true})
	completed: boolean
}

const Like_: any = (a: { [key: string]: any }, b: string) =>
	({[b]: Like(`%${a[b]}%`) as unknown as string})


@Resolver()
export class TaskResolver {
	@Query(returns => Array(Task))
	async tasks(@Args() params: SearchTaskInput) {
		return await Task.find(
			params.title ? Like_(params, 'title') :
				params.description ? Like_(params, 'description') :
					params
		)
	}
	
	@Mutation(returns => Task)
	async taskCreate(@Args() data: NewTaskInput) {
		return await Task.create(data).save()
	}
	
	@Mutation(returns => Array(Task))
	tasksModify() {}
}

