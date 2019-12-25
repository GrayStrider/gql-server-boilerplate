// process.env.NODE_ENV = 'development'

import {ASTNode, print} from 'graphql'
import request from 'graphql-request'
import gql from 'graphql-tag'
import {Connection, createConnection, getConnection} from 'typeorm'
import {HOST, PORT} from '../../config/consts'
import {ORMConfig} from '../../config/typeorm'
import {main} from '../server'
import {warn} from '../utils/log'

let conn: Connection
const url = `http://${HOST}:${PORT}/graphql`
const postQuery = async <T>(query: ASTNode, mainField?: string) => {
	const res: {[key: string]: any} = await request(url, print(query))
	return mainField ? res?.[mainField]: res }

beforeAll(async () => {
	warn("testing env:" + process.env.NODE_ENV)
	warn(ORMConfig)
	jest.setTimeout(30000)
	await main()
	conn = await getConnection() ?? await createConnection(ORMConfig)

	await conn.dropDatabase()
	await conn.synchronize()
})

afterAll(async () => {
	await conn.dropDatabase()
	await conn.close()
})


it('should fetch tasks', async () => {
  const res = await postQuery(gql`{
      tasks {
          title
      }
  }`)
	expect(res).toStrictEqual({'tasks': []})
	
})

it('should fetch tasks with main field', async () => {
  const res = await postQuery( gql`{
      tasks {
          title
      }
  }`, 'tasks')
	expect(res).toStrictEqual([])
	
})


