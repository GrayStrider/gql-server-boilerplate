import supertest, {SuperTest, Test} from 'supertest'
import main from 'src/server'
import {sleep} from 'src/utils'

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
		
		expect.assertions(2)
		const res = await request.get('/')
		expect(res.status).toBe(200)
		expect(res.text).toBe('Hello World!')
		
	})

})
