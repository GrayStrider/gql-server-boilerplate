import {Promise as bb} from 'bluebird'
import {GraphQLClient} from 'graphql-request'
import gql from 'graphql-tag'
import * as http from 'http'
import {Connection, EntityManager, getConnection, Like} from 'typeorm'
import {GQL_URL} from '../../config/consts'
import {ExampleEntity} from '../__typeorm reference/Entity'
import {Tag} from '../entity/KBF/Tag'
import {Task} from '../entity/KBF/Task'
import {getSdk} from '../generated/graphql'
import {main} from '../server'
import {postQuery, postQueryTyped} from '../utils/postQuery'

let conn: Connection
let db: EntityManager
let server: http.Server

beforeAll(async () => {
	jest.setTimeout(30000)
	server = await main()
	conn = await getConnection()
	db = conn.manager
})

afterAll(async () => {
	server.close()
})


it('should return empty', async () => {
	const tasks = await db.findAndCount(Task)
	expect(tasks).toStrictEqual([[], 0])
})
it('should create and fetch entity', async () => {
  await postQuery(gql`mutation {
      exampleEntityCreateWithValidation(manyOptions: "test 123", validatedName: "test 123") {
          array
      }
  }`)
  const {exampleEntity} = await postQuery(gql`{
      exampleEntity(validatedName: "test 123") {
          autoIncrement
          children {
              data
          }
      }
  }`)
	expect(exampleEntity).toStrictEqual([{'autoIncrement': 1, children: []}])
})
it('search using options', async () => {
	// fallback {} value for nullable destructuring
	const {validatedName} = await db.findOne(ExampleEntity,
		{
			where: {
				validatedName: Like('%123')
			}
		}) || {}
	expect(validatedName).toStrictEqual('test 123')
})
it('direct conditions search', async () => {
	// fallback {} value for nullable destructuring
	const {validatedName} = await db.findOne(ExampleEntity,
		{isActive: false, validatedName: Like('%123')},) || {}
	expect(validatedName).toStrictEqual('test 123')
})

it.skip(`handle task/tag relations`, async () => {
  // create task with tag, both are present
  const [task, task2] = await postQueryTyped<Task, Task>(gql`mutation {
      task1: taskCreate(title: "test") {
          id
          title
      }

      task2: taskCreate(title: "test2") {
          id
          title
      }
  }`)
	
	console.log(task.createdAt)
	console.log(task2.createdAt)

  // if tag exists, assign existing tag

  // tags available from task field

  // tasks available from tag fiend

  // task deleted => task is not present on tag

  // task deleted, tag is empty => delete tag

  // tag deleted => not present on any tasks
	
	expect(true).toBe(false)
})

it(`should create one task`, async () => {
  const [task] = await postQueryTyped<Task>(gql`mutation {
      taskCreate(title: "task1", tags: ["one", "two"]) {
          createdAt
          tags {
              title
          }
      }

  }`)
	expect(task.tags).toStrictEqual([{"title": "one"}, {"title": "two"}])

	const [tags, tasks] = await postQueryTyped<Tag[], Task[]>(gql`{
			tags {
					title
			}
			
			tasks {
					title
			}
	}`)
	console.log(tasks.map((task) => task.title))
	expect(tags).toStrictEqual([{"title": "one"}, {"title": "two"}])
	
})

// type GQLResponse<T> = { [key: string]: Partial<T> }
//
// async function testDestructuringGQLQuery<T>(): Promise<{ [key: string]: T }>
// async function testDestructuringGQLQuery<T, K>(): Promise<{ [key: string]: T } & { [key: string]: K }>
//
// async function testDestructuringGQLQuery<T, K>(): Promise<{ [key: string]: T } & { [key: string]: K }> {
// 	const res = {tasks: {}, tags: {}} as any
//
// 	return new Promise((resolve) => resolve(res))
// }
//
//
// (async () => {
// 	const {task, tag} = await testDestructuringGQLQuery<Task, Tag>()
//
// 	console.log(task.completed)
// 	console.log(tag.tags)
//
// })()
//
// async function destrGQLQuery<T>(): Promise<T>
// async function destrGQLQuery<T, K>(): Promise<[T, K]>
// async function destrGQLQuery<T, K>(): Promise<[T, K]> {
//
// 	return {} as any
// }
//
//
// (async () => {
// 	const [task, tag] = await destrGQLQuery<Task, Tag>()
//
// 	console.log(task.completed)
// 	console.log(tag.title)
//
//
// 	const task2 = await destrGQLQuery<Task>()
// 	console.log(task2.createdAt)
//
// })()



it(`should reduce bb`, async () => {
	const tagNames = ['one', 'two', 'three']
	await db.create(Tag, {title: "three"}).save()
	
	const tags = await bb.reduce(tagNames, async (total: any[], title) => {
		const getTag = await Tag.findOne({title}) ??
			await Tag.create({title}).save()
		return [...total, getTag]
		}, []
	)
	
	expect(tags).toHaveLength(3)
})

const client = new GraphQLClient(GQL_URL)
const sdk = getSdk(client)
sdk.tasks().then((task) => task.tasks.map(
	(task) => task.id
))
