import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {Task} from '@/models/KBF/entity/Task'
import {bb} from '../../utils/libsExport'
import {LikeWrapper} from '@/DB/typeorm/Like'
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
	tasks (@Args() {tag, ...params}: SearchTaskInput) {

		return Task.find({
			where: params.title
				? LikeWrapper(params, 'title')
				: params.description
					? LikeWrapper(params, 'description')
					: tag
						? {...params}
						: params,
		})

	}

	@Query(returns => [Task])
	getTasks () {

		return Task.find()

	}


	@Mutation(returns => Task)
	async taskCreate (@Args() {tags: tagNames, ...data}: NewTaskInput) {

		if (tagNames) {

			const labels = await bb.reduce(
				tagNames, async (acc: DeepPartial<Label>[], name) => {

					const getTag = await Label.findOne({name}) ??
						await Label.create({name})
					return [...acc, getTag]

				}, []
			)

			return Task.create({...data, labels})

		}

		return Task.create(data).save()

	}

}
