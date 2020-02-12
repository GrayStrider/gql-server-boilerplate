import main from '@/server'
import supertest from 'supertest'
import {SuperTest, Test, sleep} from '@/utils'
import {Task, Weather, Cities} from '@/models'
import {times, keys, min, values, head} from 'ramda'
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
		expect.assertions(2)
		const weathers = times(() => Weather.create({
				city: faker.random.arrayElement(values(Cities)) as Cities,
				...function () {
					const temps = times(() =>
						faker.random.number(100), 2)
					return {
						temp_lo: Math.min(...temps),
						temp_hi: Math.max(...temps)
					}
				}(),
				prcp: faker.random.number(100) / 100,
				date: faker.date.past(10)
			}
		), 100)
		await Weather.save(weathers)
		expect(await Weather.count()).toBe(100 + 1)
		expect(await Weather.find({skip: 10, take: 1}).then(head))
			.toEqual(expect.objectContaining({
				city: expect.any(String),
				date: expect.any(Date),
				id: expect.toBeUUID(),
				prcp: expect.any(Number),
				temp_lo: expect.any(Number),
				temp_hi: expect.any(Number)
			}))
	})
})
