import * as http from 'http'
import {Connection} from 'typeorm'
import {setupTests} from 'src/utils/test-utils/setupTests'


beforeAll(() => {
	jest.setTimeout(30000)
})

let conn: Connection
let server: http.Server | null

afterEach(async () => {
	await conn.close()
	await server?.close()
})

it(`should start the server and connect`, async () => {
	({conn, server} = await setupTests())
	expect(conn && server).toBeTruthy()
})
