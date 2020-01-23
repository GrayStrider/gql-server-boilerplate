import {Resolver, Mutation} from 'type-graphql'
import {Task} from '@/models/KBF/entity'

@Resolver()
export class CreateResolver {
	
	@Mutation(returns => Task)
	async createTask (): Promise<Task> {
		
		const task = Task.create({})
		
		return task.save()
		
	}
	
}
