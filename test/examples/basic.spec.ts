import * as http from 'http'
import Koa from 'koa'
import supertest, {SuperTest, Test} from 'supertest'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import {prop} from 'ramda'
import {sleep} from 'src/utils'
import {PORT} from 'config/export'
import testFoo from 'test/examples/basic'


function main () {

	const app = new Koa()
	const router = new Router()
	router.get('/', async ctx => {

		ctx.body = {
			data: 'Sending some JSON',
		}
	
	})
	app.use(router.routes())
	return app

}

/**
 * Takes ~5-6 seconds to run from watch mode on terminal runner
 */

describe('koa', () => {

	let server: Koa
	let request: SuperTest<Test>
	
	beforeAll(() => {

		server = main()
		request = supertest(server.callback())
		
	})
	
	
	it('should start new server', async () => {

		expect.assertions(1)
		const res = await request.get('/')
		expect(res.body.data).toBe('Sending some JSON')
	
	})
	
	it('should send 404', async () => {

		expect.assertions(1)
	  expect(await request.get('/foobar').then(prop('status'))).toBe(404)
	
	})
	
})

describe('sync', () => {
	
	it('should do basic test', () => {

		expect.assertions(1)
		expect(testFoo()).toBe(true)
	
	})
	
	it('should', async () => {

		expect.assertions(1)
		expect(2 + 2).toBe(4)
	
	})
	
	it('should pass', async () => {

		expect.assertions(1)
		expect({foo: 'bar'}).toStrictEqual({foo: 'bar'})
	
	})

})
