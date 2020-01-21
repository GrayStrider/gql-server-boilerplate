import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {Task} from '@/models/KBF/entity/Task'
import {bb, RA} from '../../utils/libsExport'
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
	async tasks (@Args() {tag, ...params}: SearchTaskInput) {

		return Task.find({
			where: RA.isNotNil(params.title)
				? LikeWrapper(params, 'title')
				: RA.isNotNil(params.description)
					? LikeWrapper(params, 'description')
					: RA.isNotNil(tag)
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

		if (RA.isNotNilOrEmpty(tagNames)) {

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
