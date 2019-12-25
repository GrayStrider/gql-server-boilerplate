process.env.NODE_ENV = 'development' // TODO fix local postgres and switch to test

import {ASTNode, print} from 'graphql'
import request from 'graphql-request'
import gql from 'graphql-tag'
import * as http from 'http'
import {Connection, createConnection} from 'typeorm'
import {HOST, PORT} from '../../config/consts'
import {ORMConfig} from '../../config/typeorm'
import {Task} from '../entity/KBF/Task'
import {main} from '../server'

let conn: Connection
let server: http.Server
const url = `http://${HOST}:${PORT}/graphql`


const postQuery = async <T>(query: ASTNode, mainField?: string) => {
	const res: {[key: string]: any} = await request(url, print(query))
	return mainField ? res?.[mainField]: res }

beforeAll(async () => {
	jest.setTimeout(30000)
	// server = await main()
	
	conn = await createConnection(ORMConfig) // get connection, if starting server from here
	
	await conn.synchronize(true)
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


