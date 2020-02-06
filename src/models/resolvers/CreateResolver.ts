import {Resolver, Mutation, Args} from 'type-graphql'
import {DeepPartial} from 'typeorm'
import {Task, Label} from '@/models'
import {RD, bb} from '@/utils'
import {NewTaskInput} from '@/models/inputs'

@Resolver()
export default class CreateResolver {
	
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

