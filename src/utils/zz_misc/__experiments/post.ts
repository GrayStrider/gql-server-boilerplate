import Axios from 'axios'
import {SERVER_URL} from '../../../../config/_consts'

Axios.defaults.baseURL = SERVER_URL

async function main() {
	const obj = {
		foo: 'bar',
		baz: 12,
		zub: {
			boo: 'tas'
		}
	}
	console.log('Posting')
	const res = await Axios.post('/post', ['stringdata'])
	res
	console.log('Done')
}
