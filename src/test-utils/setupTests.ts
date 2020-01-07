import axios from 'axios'
import * as http from 'http'
import {Connection, createConnection, getConnection} from 'typeorm'
import {GQL_URL} from '../../config/_consts'
import {ORMConfig} from '../../config/_typeorm'
import {main} from '../server'
import {log} from '../utils/log'

export async function setupTests() {
	
	let conn: Connection
	let server: http.Server | null
	jest.setTimeout(30000)
	
	/**
	 * Connect to running server with test_runner
	 * If no server running, start the server and then connect
	 */
	if (await isUp(GQL_URL)) {
		log.await(`server's up, connecting to database`)
		conn = await createConnection(ORMConfig)
		server = null
	} else {
		log.await(`${GQL_URL} is down, starting server`)
		server = await main()
		log.await(`connecting to database`)
		conn = getConnection()
	}
	log.warn(`resetting database`)
	await conn.synchronize(true)
	return {conn, server}
}

export async function isUp(url: string): Promise<boolean> {
	return await axios.get(url)
		.then(() => true)
		.catch(err => {
			if (err.code === 'ECONNREFUSED') {
				return false
			} else {
				log.warn(err.message)
				return true
			}
		})
}

