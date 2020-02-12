import TasksResolver from '@/models/resolvers/TasksResolver'
import CreateResolver from '@/models/resolvers/CreateResolver'
import {signale} from '@/utils'
import {SERVER_URL} from '@config'
import User from '@/models/entity/User'
import TColumn from '@/models/entity/TColumn'
import Swimlane from '@/models/entity/Swimlane'
import Subtask from '@/models/entity/Subtask'
import Priority from '@/models/entity/Priority'
import TaskNumber from '@/models/entity/TaskNumber'
import Label from '@/models/entity/Label'
import TDate from '@/models/entity/TDate'
import Color from '@/models/entity/Color'
import Task from '@/models/entity/Task'
import Comment from '@/models/entity/Comment'
import createSchema from '@/graphql/type-graphql/createSchema'
import genericApolloServer from '@/graphql/apollo/genericServer'
import Weather, {Cities} from '@/models/PostgresTutorialWeather/entity/Weather'
import City from '@/models/PostgresTutorialWeather/entity/City'

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
	TasksResolver,
	CreateResolver,
	Weather,
	Cities,
	City
	
	
}
export default async function makeKBFServer () {
	
	const name = 'kbf'
	const path = `/${name}`
	const schema = await createSchema([TasksResolver, CreateResolver], name)
	signale.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware({path})
	
}

