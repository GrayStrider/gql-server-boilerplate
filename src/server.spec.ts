import supertest, {SuperTest, Test} from 'supertest'
import main from '@/server'
import {sleep} from '@/utils'

describe('server', () => {
	
	let request: SuperTest<Test>
	
	beforeAll(async () => {
		
		request = supertest((await main()).callback())
		
	})
	
	afterAll(async () => {

		// Avoid jest open handle error
		await sleep(500)
	
	})
	
	it('should start the server', async () => {
		
		expect.assertions(1)
		const res = await request.get('/')
		expect(res.status).toBe(302)
		
	})

})
