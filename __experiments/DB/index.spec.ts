import main from '@/server'
import supertest from 'supertest'
import {SuperTest, Test, sleep} from '@/utils'
import {Task} from '@/models'

let request: SuperTest<Test>
beforeAll(async () => {
	jest.setTimeout(99999)
	request = supertest((await main()).callback())
})
afterAll(async () => {
	await sleep(500)
})
describe('setup', () => {
	it('should initialize connection', async () => {
		expect.assertions(1)
		const {status} = await request.get('/')
		expect(status).toBe(200)
	})
	
})

describe('DB calls', () => {
	it('should create entity', async () => {
		expect.assertions(1)
	  const tasks = await Task.find()
		expect(tasks).toStrictEqual([])
	})
})
