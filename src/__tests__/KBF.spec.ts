process.env.NODE_ENV = 'development'

import gql from 'graphql-tag'
import {Connection, createConnection, getConnection} from 'typeorm'
import {ORMConfig} from '../../config/_typeorm'
import {main} from '../server'
import {warn} from '../utils/log'
import {postQuery} from '../utils/postQuery'

let conn: Connection


beforeAll(async () => {
	warn('testing env:' + process.env.NODE_ENV)
	// warn(ORMConfig)
	jest.setTimeout(30000)
	await main()
	conn = await getConnection() /*await createConnection(ORMConfig)*/
	
	await conn.dropDatabase()
	await conn.synchronize()
})

afterAll(async () => {
	await conn.dropDatabase()
	await conn.close()
})


it('should create task', async () => {
	const res = await postQuery(gql`mutation {
      taskA: taskCreate(
          title: "new task 2"
          description: "optional"
      ) {
          title
          description
      }

      taskB: taskCreate(
          title: "new task second row"
      ) {
          title
      }
  }`)
	
	expect(res).toStrictEqual({
		"taskA": {
			"title": "new task 2",
			"description": "optional"
		},
		"taskB": {
			"title": "new task second row"
		}
	})
})

it('should fetch tasks', async () => {
  const res = await postQuery(gql`{
      tasks {
          title
      }
  }`).then(value => value["tasks"])
	expect(res.length).toBe(2)
	expect(res).toBe(2)

})
