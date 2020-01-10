import gql from 'graphql-tag'
import * as http from 'http'
import {Connection, EntityManager, Like} from 'typeorm'
import {Tag} from 'src/models/KBF/entity/Tag'
import {Task} from 'src/models/KBF/entity/Task'
import {setupTests} from 'src/utils/test-utils/setupTests'
import {postQuery, gqlRequest} from 'src/graphql/utils/postQuery'
import {bb} from '../../utils/libsExport'
import {ExampleEntity} from 'src/DB/typeorm/examples/entity/Entity'

let conn: Connection
let db: EntityManager
let server: http.Server | null
beforeAll(async () => {
	({conn, server} = await setupTests())
	db = conn.manager
})

it('should return empty', async () => {
	const tasks = await db.findAndCount(Task)
	expect(tasks).toStrictEqual([[], 0])
})
it.skip('should create and fetch entity', async () => {
  await gqlRequest<ExampleEntity>(gql`mutation {
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
it(`should create one task`, async () => {
  const {tags} = await gqlRequest<Task>(gql`mutation {
      taskCreate(title: "task1", tags: ["one", "two"]) {
          createdAt
          tags {
              title
          }
      }

  }`)
	expect(tags).toStrictEqual([{'title': 'one'}, {'title': 'two'}])

  const [Tags, tasks] = await gqlRequest<Tag[], Task[]>(gql`{
      tags {
          title
      }

      tasks {
          title
      }
  }`)
	console.log(tasks.map((task) => task.title))
	expect(Tags).toStrictEqual([{'title': 'one'}, {'title': 'two'}])

})
it(`should reduce bb`, async () => {
	const tagNames = ['one', 'two', 'three']
	await db.create(Tag, {title: 'three'}).save()
	
	const tags = await bb.reduce(tagNames, async (total: any[], title) => {
			const getTag = await Tag.findOne({title}) ??
				await Tag.create({title}).save()
			return [...total, getTag]
		}, []
	)
	
	expect(tags).toHaveLength(3)
})
it.skip(`handle task/tag relations`, async () => {
  // create task with tag, both are present
  const [task, task2] = await gqlRequest<Task, Task>(gql`mutation {
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
