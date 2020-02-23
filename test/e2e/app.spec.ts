import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { INestApplication } from '@nestjs/common'
import { sleep } from 'src/utils'

describe('appController', () => {
	let app: INestApplication
	
	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()
		
		app = moduleFixture.createNestApplication()
		await app.init()
	})
	afterAll(async () => {
		await sleep(500)
	})
	
	it('/ (GET)', async () => {
		expect.assertions(2)
		const server = app.getHttpServer()
		const {status, text} = await request(server).get('/')
		expect(status).toBe(200)
		expect(text).toBe('Hello World!')
	})
})
