process.env.NODE_ENV = "development"

import {getConnection} from 'typeorm'
import {ORMConfig} from '../../config/typeorm'
import {Task} from '../entity/KBF/Task'
import {main} from '../server'

beforeAll(() => {
	// process.env.NODE_ENV = "development"
})


afterAll(() => {
	// process.exit(0)
})

it('should start the local server', async () => {
	const server = await main()
	const dbConn = getConnection()
	const res = await dbConn.manager.find(Task)
	expect(res).toStrictEqual({})
})

