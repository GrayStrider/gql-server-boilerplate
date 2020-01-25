import GetResolver from './resolvers/Get'
import CreateResolver from './resolvers/Create'
import {genericApolloServer} from '@/graphql'
import {sig} from '@/utils'
import {SERVER_URL} from '@config'
import User from '@/models/KBF/entity/User'
import TColumn from '@/models/KBF/entity/TColumn'
import Swimlane from '@/models/KBF/entity/Swimlane'
import Subtask from '@/models/KBF/entity/Subtask'
import Priority from '@/models/KBF/entity/Priority'
import TaskNumber from '@/models/KBF/entity/TaskNumber'
import Label from '@/models/KBF/entity/Label'
import TDate from '@/models/KBF/entity/TDate'
import Color from '@/models/KBF/entity/Color'
import Task from '@/models/KBF/entity/Task'
import Comment from '@/models/KBF/entity/Comment'
import ColorValues from '@/models/KBF/entity/Color.variants'
import createSchema from '@/graphql/type-graphql/createSchema'

export {
	User,
	TColumn,
	Swimlane,
	Subtask,
	Priority,
	TaskNumber,
	Label,
	TDate,
	Color,
	Comment,
	Task,
	ColorValues,
	GetResolver,
	CreateResolver
}

export default async function makeKBFServer () {
	
	const name = 'kbf'
	const path = `/${name}`
	const schema = await createSchema([GetResolver, CreateResolver], name)
	sig.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware({path})
	
}

