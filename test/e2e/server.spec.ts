process.env.NODE_CONFIG_DIR = './packages/server/config'
import { supertest, sleep } from '@strider/utils-ts'
import { ASTNode } from 'graphql'
import main from '@/server'
import sleep from 'sleep-promise'

describe('server', () => {
	
	let request: Request
	let post: Post
	
	beforeAll(async () => {
		({request, post} = supertest(await main(), '/example'))
	})
	
	afterAll(async () => {
		await sleep(500)
	})
	
	it('should start the server and redirect', async () => {
		expect.assertions(1)
		const {status} = await request.get('/foobar')
		expect(status).toBe(302)
	})
	
})
