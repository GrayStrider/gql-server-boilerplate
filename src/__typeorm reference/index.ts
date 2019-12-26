import {ArgsType, Resolver} from 'type-graphql'
import {validateAndSave} from '../utils/validator'
import {Category} from './Adjacency list'

@ArgsType()
export class ListsInput implements Partial<Category> {
	description: string
	name: string
}

@Resolver()
export class ListsResolver {
	async adjacencyList() {
		return validateAndSave(Category.create({}))
	}
}
