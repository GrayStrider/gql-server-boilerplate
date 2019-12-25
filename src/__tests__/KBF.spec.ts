import gql from 'graphql-tag'
import * as http from 'http'
import {Connection, getConnection} from 'typeorm'
import {Task} from '../entity/KBF/Task'
import {main} from '../server'

let conn: Connection
let server: http.Server

beforeAll(async () => {
	// console.log(process.env.NODE_ENV)
	// process.env.NODE_ENV = "development"
	// console.log(`changed: ${process.env.NODE_ENV}`)
		conn = await getConnection()
		server = await main()
	await conn.synchronize(true)
})

afterAll(async () => {
	await conn.dropDatabase()
	await conn.close()
	server.close()
	process.exit(0)
})

const query = gql`query {
    tasks {
        title
    }
}`

it('should fetch tasks', async () => {
	
	
	await expect(conn.manager.find(Task)).toMatchObject({})
	// request<Task[]>(`${HOST}:${PORT}/graphql`, query).then(console.log)
	
})


