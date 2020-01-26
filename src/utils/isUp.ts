import axios from 'axios'
import {signale} from '@/utils/index'

export default async function isUp (url: string): Promise<boolean> {
	
	return axios.get(url)
		.then(() => true)
		.catch(err => {
			
			if (err.code === 'ECONNREFUSED') return false
			
			signale.warn(err.message)
			return true
			
		})
	
}

