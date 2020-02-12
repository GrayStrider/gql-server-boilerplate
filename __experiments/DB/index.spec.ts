import main from '@/server'
import supertest from 'supertest'
import {SuperTest, Test, sleep} from '@/utils'
import {Task, Weather, Cities} from '@/models'
import {times, keys, min} from 'ramda'
import * as faker from 'faker'

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

describe('DB calls', () => {
	it('should create weather', async () => {
		expect.assertions(1)
		const SFW = Weather.create({
			city: Cities.SF,
			temp_lo: 53,
			temp_hi: 57,
			prcp: 0.0,
			date: new Date('1994-11-29')
		})
		await SFW.save()
		expect(await Weather.findOne()).toMatchObject(SFW)
	})
	
	it('should generate fake data', async () => {
		expect.assertions(1)
		const weathers = times(() => Weather.create({
				city: faker.random.arrayElement(keys(Cities)) as Cities,
				...function () {
					const temps = times(() =>
						faker.random.number(100), 2)
					return {
						temp_lo: Math.min(...temps),
						temp_hi: Math.max(...temps)
					}
				}(),
				prcp: faker.random.number({max: 1, precision: 0.1}),
				date: faker.date.past(10)
			}
		), 100)
		console.log(weathers)
	})
})
