import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {DeepPartial} from 'typeorm'
import {LikeWrapper} from '@/DB/typeorm/index'
import {Label, Task} from '@/models/KBF/index'
import {bb, RD} from '@/utils'
import {NewTaskInput, SearchTaskInput} from '@/models/KBF/inputs'

// TODO recommended to implement this for every mutation, kinda makes sense.
export interface MutationResponse {
	code: string
	success: boolean
	message: string
}


@Resolver()
export class KBFResolver {
	
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
	
	@Query(returns => [Task])
	async getTasks () {
		
		return Task.find()
		
	}
	
	
	@Mutation(returns => Task)
	async taskCreate (@Args() {tags: tagNames, ...data}: NewTaskInput) {
		
		if (RD.isNotNilOrEmpty(tagNames)) {
			
			const labels = await bb.reduce(
				tagNames, async (acc: Array<DeepPartial<Label>>, name) => {
					
					const getTag = await Label.findOne({name}) ??
						Label.create({name})
					return [...acc, getTag]
					
				}, []
			)
			
			return Task.create({...data, labels})
			
		}
		
		return Task.create(data).save()
		
	}
	
}
