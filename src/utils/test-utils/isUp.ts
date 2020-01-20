import axios from 'axios'
import {log} from '@/utils/libsExport'

export async function isUp (url: string): Promise<boolean> {

	return await axios.get(url)
		.then(() => true)
		.catch(err => {

			if (err.code === 'ECONNREFUSED') return false

			log.warn(err.message)
			return true

		})

}
