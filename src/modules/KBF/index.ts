import {Arg, Field, Mutation, ObjectType, Query, Resolver} from 'type-graphql'
import {Task} from '../../entity/KBF/Task'

@ObjectType()
export class TaskOps {
	@Field(returns => Task)
	create() {
	
	}
	
	@Field(returns => Task)
	getById(@Arg('taskID') id: number) {
	
	}
}

@Resolver()
export class TaskResolver {
	@Query(returns => TaskOps)
	taskOps() {
		return TaskOps
	}
}
