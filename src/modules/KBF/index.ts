import {Max} from 'class-validator'
import {Args, ArgsType, Field, Mutation, Query, Resolver} from 'type-graphql'
import {Like} from 'typeorm'
import {Tag} from '../../entity/KBF/Tag'
import {Task} from '../../entity/KBF/Task'

@ArgsType()
class NewTaskInput {
	@Field()
	title: string
	
	// on field nullable only applicable in the context of inputs
	@Field({nullable: true})
	description: string
	
	@Field(returns => String, {nullable: true})
	tag: string
}

@ArgsType()
class SearchTaskInput implements Partial<Task> {
	@Field({nullable: true})
	@Max(100)
	title: string
	
	@Field({nullable: true})
	description: string
	
	@Field({nullable: true})
	id: string
	
	@Field({nullable: true})
	completed: boolean
}

const Like_: any = (a: { [key: string]: any }, b: string) =>
	({[b]: Like(`%${a[b]}%`) as unknown as string})


@Resolver()
export class TaskResolver {
	@Query(returns => Array(Task))
	async tasks(@Args() params: SearchTaskInput) {
		return await Task.find(
			{
				relations: ['tags'],
				where    : params.title ? Like_(params, 'title') :
					params.description ? Like_(params, 'description') :
						params
			}
		)
	}
	
	@Mutation(returns => Task)
	async taskCreate(@Args() {tag, ...data}: NewTaskInput) {
		const getTag = await Tag.findOne({title: tag}) ??
			await Tag.create({title: tag}).save()
		return await Task.create({...data, tags: [getTag]}).save()
	}
	
	@Mutation(returns => Array(Task))
	tasksModify() {}
}

@Resolver()
export class TagResolver {
	@Query(returns => [Tag])
	async tags() {return await Tag.find({relations: ['tasks']})}
	
	// @Mutation(returns => Tag)
	// async tagsAddNew(@Args() data: TagInput) {
	//
	// 	return await Tag.create({tasks: [], ...data}).save()
	// }
}
