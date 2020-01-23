import {Resolver, Mutation} from 'type-graphql'
import {Task} from '@/models/KBF'

@Resolver()
class CreateResolver {
	
	@Mutation(returns => Task)
	async createTask (): Promise<Task> {
		
		const task = Task.create({})
		
		return task.save()
		
	}
	
}

export default CreateResolver
