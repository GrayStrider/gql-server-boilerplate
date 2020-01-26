import * as http from 'http'
import {Connection, getConnection} from 'typeorm'
import main from 'src/server'
import {PORT} from 'config/export'

class TestServer {

	private _server: http.Server | null

	private _connection: Connection
	
	async get (): Promise<{ server: http.Server, connection: Connection }> {

		if (this._server) {

			await this._connection.synchronize(true)
			return {server: this._server, connection: this._connection}
		
		}
		
		const app = await main()
		this._server = app.listen(PORT)
		this._connection = getConnection()
		return {server: this._server, connection: this._connection}
	
	}

}

const testServerInstance = new TestServer()

export default async function testServer () {

	jest.setTimeout(30000)
	return testServerInstance.get()

}

