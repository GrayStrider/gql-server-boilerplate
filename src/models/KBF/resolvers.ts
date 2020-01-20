import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {Task} from '@/models/KBF/entity/Task'
import {bb} from '../../utils/libsExport'
import {Like_} from '@/DB/typeorm/Like'
import {NewTaskInput, SearchTaskInput} from './inputs'
import {Label} from '@/models/KBF/entity'
import {DeepPartial} from 'typeorm'

// TODO recommended to implement this for every mutation, kinda makes sense.
export interface MutationResponse {
	code: string
	success: boolean
	message: string
}


@Resolver()
export class KBFResolver {
	@Query(returns => [Task])
	async tasks(@Args() {tag, ...params}: SearchTaskInput) {
		return await Task.find(
			{
				where: params.title ? Like_(params, 'title') :
					params.description ? Like_(params, 'description') :
						tag ? {...params} :
							params,
			},
		)
	}
	
	@Query(returns => [Task])
	async getTasks() {
		
		return await Task.find()
	}
	
	
	@Mutation(returns => Task)
	async taskCreate(@Args() {tags: tagNames, ...data}: NewTaskInput) {
		if (tagNames) {
			const labels = await bb.reduce(tagNames, async (acc: DeepPartial<Label>[], name) => {
					const getTag = await Label.findOne({name}) ??
						await Label.create({name})
					return [...acc, getTag]
				}, [],
			)
			
			return Task.create({...data, labels})
		}
		
		return await Task.create(data).save()
	}
	
	@Mutation(returns => Array(Task))
	tasksModify() {
		throw 'implement'
	}
}
