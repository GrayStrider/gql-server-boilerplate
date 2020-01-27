import supertest, {SuperTest, Test} from 'supertest'
import main from 'src/server'

describe('server', () => {

	let request: SuperTest<Test>
	
	beforeAll(async () => {

		request = supertest((await main()).callback())
	
	})

	it('should start the server', async () => {

		expect.assertions(2)
		const res = await request.get('/')
		expect(res.status).toBe(200)
		expect(res.text).toBe('Hello World!')

	})

})
