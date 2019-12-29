import {Connection, createConnection, getConnection} from 'typeorm'
import {ORMConfig} from '../../config/_typeorm'
import {main} from '../server'
import {warn} from '../utils/log'

export async function setupTests() {
	let conn: Connection
	jest.setTimeout(30000)
	/**
	 * Connect to running server with test_runner
	 * If no server running, start the server and then connect
	 */
	try {
		conn = await createConnection(ORMConfig)
	} catch (e) {
		warn(e, 'no default connection found, starting server')
		await main()
		conn = getConnection()
	}
	await conn.synchronize(true)
	
	return conn
}
