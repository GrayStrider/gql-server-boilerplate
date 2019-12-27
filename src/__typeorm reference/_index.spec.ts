import gql from 'graphql-tag'
import * as http from 'http'
import {Connection, EntityManager, getConnection, Like} from 'typeorm'
import {Task} from '../entity/KBF/Task'
import {main} from '../server'
import {postQuery} from '../utils/postQuery'
import {ExampleEntity} from './Entity'

let conn: Connection
let db: EntityManager
let server: http.Server

function setup() {
	beforeAll(async () => {
		jest.setTimeout(30000)
		server = await main()
		conn = await getConnection()
		db = conn.manager
	})
	
	afterAll(async () => {
		server.close()
	})
}

setup()

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
      }
  }`)
	expect(exampleEntity).toStrictEqual([{'autoIncrement': 1}])
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

