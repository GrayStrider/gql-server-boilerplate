import {ASTNode} from 'graphql'
import main from 'src/server'
import {sleep, supertest, Test, SuperTest} from 'src/utils'

describe('server', () => {
	
	let request: SuperTest<Test>
	let post: <T>(query: ASTNode) => Promise<T>
	
	beforeAll(async () => {
		
		({request, post} = supertest(await main(), '/example'))
		
	})
	
	afterAll(async () => {
		
		// Avoid jest open handle error
		await sleep(500)
		
	})
	
	it('should start the server', async () => {
		
		expect.assertions(2)
		const {status, text} = await request.get('/')
		expect(status).toBe(200)
		expect(text).toBe('Hello World!')
	})

})
