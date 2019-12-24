import {Arg, Args, ArgsType, Field, InputType, Mutation, Query, Resolver} from 'type-graphql'
import {Task} from '../../entity/KBF/Task'
@ArgsType()
class NewTaskInput implements Partial<Task> {
	@Field()
	title: string
}

@Resolver()
export class TaskResolver {
	@Query(returns => Array(Task))
	tasks() { return Task.find()}
	
	@Mutation(returns => Task)
	async taskCreate(@Args() {title}: NewTaskInput) {
		return await Task.create({title}).save()
	}
	
	@Mutation(returns => Array(Task))
	tasksModify() {}
}

