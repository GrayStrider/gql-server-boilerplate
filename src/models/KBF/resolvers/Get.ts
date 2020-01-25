import {Resolver, Query, Args} from 'type-graphql'
import {Task} from '@/models/KBF'
import {SearchTaskInput} from '@/models/KBF/inputs'
import {RD} from '@/utils'
import {LikeWrapper} from '@/DB/typeorm'

@Resolver()
export default class GetResolver {
	
	@Query(returns => [Task])
	async tasks (@Args() {tag, ...params}: SearchTaskInput) {
		
		return Task.find({
			where: RD.isNotNil(params.title)
				? LikeWrapper(params, 'title')
				: RD.isNotNil(params.description)
					? LikeWrapper(params, 'description')
					: RD.isNotNil(tag)
						? {...params}
						: params,
		})
		
	}
	
}

