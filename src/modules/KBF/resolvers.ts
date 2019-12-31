import {Args, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql'
import {getConnection} from 'typeorm'
import {Tag} from '../../entity/KBF/Tag'
import {Task} from '../../entity/KBF/Task'
import {Like_} from '../../utils/typeorm/Like'
import {validateAndSave} from '../../utils/type-graphql/validator'
import {isAuth} from '../middleware/isAuth'
import {NewTaskInput, SearchTaskInput} from './inputs'
import {Promise as bb} from 'bluebird'



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
			
			return await validateAndSave(Task.create({...data, tags}))
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
