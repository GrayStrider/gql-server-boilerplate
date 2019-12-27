import * as http from 'http'
import {Connection, EntityManager, getConnection} from 'typeorm'
import {Task} from '../entity/KBF/Task'
import {main} from '../server'

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

it('should ', async () => {
	
	const tasks = await db.findAndCount(Task)
	expect(tasks).toStrictEqual([[], 0])
	
	
})
