import {Resolver, Query} from 'type-graphql'
import {Task} from '@/models/KBF'

@Resolver()
class GetResolver {
	
	@Query(returns => [Task])
	async tasks () {
		
		return Task.find()
		
	}
	
}

export default GetResolver
