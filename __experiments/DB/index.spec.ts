import main from '@/server'
import supertest from 'supertest'
import {SuperTest, Test, sleep, signale, chance} from '@/utils'
import {Weather, Cities, City} from '@/models'
import {times, keys, head} from 'ramda'
import * as faker from 'faker'
import {MoreThan} from 'typeorm'

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

describe('cities', () => {
	it('should throw on incorrect city code', async () => {
		expect.assertions(2)
		const tooLong = City.create({code: 'ABCd', name: ''})
		await expect(tooLong.save())
			.rejects.toThrow(/value too long/)
		
		const notUpper = City.create({code: 'ABd', name: ''})
		await expect(notUpper.save())
			.rejects.toThrow(/violates check constraint/)
	})
	
	
	it('should generate city', async () => {
		expect.assertions(1)
		const city = City.create({code: 'GDX', name: 'Magadan'})
		await city.save()
		expect(await City.findOne()).toMatchObject(city)
	})
	
})

describe('DB calls', () => {
	it('should create weather', async () => {
		expect.assertions(1)
		const SFW = Weather.create({
			temp_lo: 53,
			temp_hi: 57,
			prcp: 0.4,
			date: new Date('1994-11-29')
		})
		await SFW.save()
		expect(await Weather.findOne()).toMatchObject(SFW)
	})
	it('should generate fake data', async () => {
		expect.assertions(2)
		
		const cityData: Record<'codes' | 'names', string[]> = {
			codes: [],
			names: []
		}
		
		times((i) => {
			const iter = keys(cityData)[i]
			while (cityData[iter].length < 10) {
				type Code = { [key in keyof typeof cityData]: string }
				
				const values: Code = {
					codes: chance.word({length: 3}).toUpperCase(),
					names: chance.city()
				}
				
				if (cityData[iter].includes(values[iter])) continue
				cityData[iter].push(values[iter])
			}
		}, keys(cityData).length)
		
		console.log(cityData)
		const cities = times(() => City.create({
				code: chance.word({length: 3}).toUpperCase(),
				name: chance.city()
			}),
			10)
		
		
		const AMOUNT = 200
		// 100K = ~7s, seems non-linear
		const startGenerate = process.hrtime()
		const weathers = times(() => Weather.create({
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
		), AMOUNT)
		const endGenerate = head(process.hrtime(startGenerate))
		/*
		 1.5K = 4
		 3K = 8
		 6K = 28
		 7K = 32
		 10K = 30
		 */
		const startSave = process.hrtime()
		// Limited to 30K entries, COPY is preferrable method of bulk iserting
		await Weather.save(weathers)
		const endSave = head(process.hrtime(startSave))
		signale.success(`Amount, saving, generating:`,
			AMOUNT, endSave, endGenerate)
		expect(await Weather.count()).toBe(AMOUNT + 1)
		expect(await Weather.find({skip: 10, take: 1}).then(head))
			.toEqual(expect.objectContaining({
				date: expect.any(Date),
				id: expect.toBeUUID(),
				prcp: expect.any(Number),
				temp_lo: expect.any(Number),
				temp_hi: expect.any(Number)
			}))
	})
	
})

describe('advanced queries', () => {
	describe('retrieve weather for rainy days', () => {
		it('find', async () => {
			const rainy = await Weather.find({
				where: {
					city: Cities.SF,
					prcp: MoreThan(0.1)
				},
				select: ['prcp', 'temp_hi', 'temp_lo'],
				take: 10,
				order: {temp_hi: 'DESC'}
			})
			// console.table(rainy)
		})
		
		it('Query Builder', async () => {
			const rainy = await Weather.createQueryBuilder('w')
				.where('w.city = :city', {city: Cities.SF})
				.andWhere('w.prcp >= :prcp_max', {prcp_max: 0.6})
				.select(['w.prcp', 'w.temp_hi'])
				.take(10)
				.orderBy('w.temp_hi', 'DESC')
				.getMany()
			// console.table(rainy)
		})
	})
	
	it('each city, max temp with min prcp', async () => {
		
		const res2 = await Weather.createQueryBuilder('w')
			.select(['w.city', 'w.temp_hi', 'w.prcp'])
			.orderBy({
				'w.city': 'DESC',
				'w.temp_hi': 'DESC',
				'w.prcp': 'ASC'
			})
			.distinctOn(['w.city'])
			.take(10)
			.getMany()
		console.table(res2)
	})
})

