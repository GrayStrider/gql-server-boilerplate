import { supertest, Request, Post } from '@qdev/utils-ts'
import main from '@/server'
import sleep from 'sleep-promise'

describe ('server', () => {
	
	let request: Request
	let post: Post
	
	beforeAll (async () => {
		({ request, post } = supertest (await main (), '/example'))
	})
	
	afterAll (async () => {
		await sleep (500)
	})
	
	it ('should start the server and redirect', async () => {
		expect.assertions (1)
		const { status } = await request.get ('/foobar')
		expect (status).toBe (302)
	})
	
})
