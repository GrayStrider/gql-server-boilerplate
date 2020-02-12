import supertest from 'supertest'
import main from 'src/server'
import {SuperTest, Test, sleep} from '@/utils'

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
