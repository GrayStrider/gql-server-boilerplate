import {ArgsType} from 'type-graphql'
import {Category} from './Adjacency list'

@ArgsType()
export class ListsInput implements Partial<Category> {
	description: string
	name: string
}
