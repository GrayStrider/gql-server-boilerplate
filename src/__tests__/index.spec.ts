import {Connection, EntityManager} from 'typeorm'
import {setupTests} from '../test-utils/setupTests'
import {isUp} from '../utils/isUp'

let conn: Connection
let db: EntityManager
beforeAll(async () => {
	({conn} = await setupTests())
	db = conn.manager
})


describe("KBF", async () => {

})

describe('utility', async () => {
	it(`should repeat promises`, async () => {
		const res = await Promise.all(
			Array(10).fill(isUp('http://localhost:4000')))
		expect(res).toStrictEqual(Array(10).fill(true))
	})
	
})
