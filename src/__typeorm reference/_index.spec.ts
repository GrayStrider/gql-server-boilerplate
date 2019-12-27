import gql from 'graphql-tag'
import * as http from 'http'
import {Connection, EntityManager, getConnection} from 'typeorm'
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
it('should create entity', async () => {
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
	expect(exampleEntity).toStrictEqual([{"autoIncrement": 1}])
	
	await expect(db.findOne(ExampleEntity, {isActive: false})).resolves
	
	return db.findOne(ExampleEntity, {isActive: false})
		.then(value => value?.validatedName)
		.then(value => expect(value).toStrictEqual("test 123"))
});
