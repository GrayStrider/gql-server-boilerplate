import request from 'supertest'
import main from 'src/server'
import {PORT} from 'config/export'
import testServer from 'test/utils/serverSingleton'

describe('server', () => {

	it('should start the server', async () => {

		expect.assertions(2)
		const {server} = await testServer()
		const res = await request(server)
			.get('/')
		expect(res.status).toBe(200)
		expect(res.text).toBe('Hello World!')
		
	})

})
