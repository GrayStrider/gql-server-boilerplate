import axios from 'axios'
import {log} from '@/utils/libsExport'

export function isUp (url: string): Promise<boolean> {

	return axios.get(url)
		.then(() => true)
		.catch(err => {

			if (err.code === 'ECONNREFUSED') return false

			log.warn(err.message)
			return true

		})

}
