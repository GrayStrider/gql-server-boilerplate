import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {getConnection} from 'typeorm'
import {Tag} from '../../entity/KBF/Tag'
import {Task} from '../../entity/KBF/Task'
import {Like_} from '../../utils'
import {NewTaskInput, SearchTaskInput} from './inputs'


@Resolver()
export class TaskResolver {
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
				where    : params.title ? Like_(params, 'title') :
					params.description ? Like_(params, 'description') :
						tag ? {...params} :
							params
			}
		)
	}
	
	@Mutation(returns => Task)
	async taskCreate(@Args() {tag, ...data}: NewTaskInput) {
		if (tag) {
			const getTag = await Tag.findOne({title: tag}) ??
				await Tag.create({title: tag})
			return await Task.create({...data, ...{tags: [getTag]}}).save()
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
