import {Resolver, Query} from 'type-graphql'
import {Task} from '@/models/KBF/entity'

@Resolver()
export class GetResolver {

	@Query(returns => [Task])
	tasks () {

		return Task.find()

	}

}
