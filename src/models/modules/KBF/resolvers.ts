import {Args, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql'
import {getConnection} from 'typeorm'
import {Tag} from '../../entity/KBF/Tag'
import {Task} from '../../entity/KBF/Task'
import {bb} from '../../../utils/libsExport'
import {Like_} from '../../../DB/typeorm/Like'
import {isAuth} from '../middleware/isAuth'
import {NewTaskInput, SearchTaskInput} from './inputs'

// TODO recommended to implement this for every mutation, kinda makes sense.
export interface MutationResponse {
	code: string
	success: boolean
	message: string
}


@Resolver()
export class TaskResolver {
	@UseMiddleware(isAuth)
	@Query(returns => String)
	async onlyForAuthorised() {
		
		return "Authorised"
	}
	
	
	@Query(returns => [Task])
	async testingFind() {
		return getConnection()
			.createQueryBuilder()
			.relation(Task, 'tags')
			.loadMany()
		
	}
	
	@Query(returns => Array(Task))
	async tasks(@Args() {tag, ...params}: SearchTaskInput) {
		return await Task.find(
			{
				where: params.title ? Like_(params, 'title') :
					params.description ? Like_(params, 'description') :
						tag ? {...params} :
							params
			}
		)
	}
	
	@Mutation(returns => Task)
	async taskCreate(@Args() {tags: tagNames, ...data}: NewTaskInput) {
		if (tagNames) {
			const tags = await bb.reduce(tagNames, async (acc: any[], title) => {
					const getTag = await Tag.findOne({title}) ??
						await Tag.create({title})
					return [...acc, getTag]
				}, []
			)
			
			return await Task.create({...data, tags})
		}
		
		return await Task.create(data).save()
	}
	
	@Mutation(returns => Array(Task))
	tasksModify() {}
}

@Resolver()
export class TagResolver {
	@Query(returns => [Tag])
	async tags() {return await Tag.find({relations: ['tasks']})}
	
}

