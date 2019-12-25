process.env.NODE_ENV = 'development'

import {ASTNode, print} from 'graphql'
import request from 'graphql-request'
import gql from 'graphql-tag'
import {AnyObject} from 'tsdef'
import {Connection, createConnection, getConnection} from 'typeorm'
import {HOST, PORT} from '../../config/consts'
import {ORMConfig} from '../../config/typeorm'
import {warn} from '../utils/log'

let conn: Connection
const url = `http://${HOST}:${PORT}/graphql`
const postQuery = async <T = AnyObject>(query: ASTNode, mainField?: string): Promise<T> => {
	const res: AnyObject = await request(url, print(query))
	return mainField ? res?.[mainField] : res
}


beforeAll(async () => {
	warn('testing env:' + process.env.NODE_ENV)
	// warn(ORMConfig)
	jest.setTimeout(30000)
	// await main()
	conn = /*await getConnection() */await createConnection(ORMConfig)
	
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
