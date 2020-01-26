import * as http from 'http'
import {Connection, createConnection, getConnection} from 'typeorm'
import main from '@/server'
import {ORMConfig, GQL_URL} from '@config'
import {signale} from '@/utils'
import isUp from '@/utils/isUp'

export default async function setupTests () {
	
	let conn: Connection
	let server: http.Server | null
	jest.setTimeout(30000)
	
	/**
	 * Connect to running server with test_runner
	 * If no server running, start the server and then connect
	 */
	if (await isUp(GQL_URL)) {
		
		signale.await('server\'s up, connecting to database')
		conn = await createConnection(ORMConfig)
		server = null
		
	}
	else {
		
		signale.await(`${GQL_URL} is down, starting server`)
		server = await main()
		signale.await('connecting to database')
		conn = getConnection()
		
	}
	signale.warn('resetting database')
	await conn.synchronize(true)
	return {conn, server}
	
}

