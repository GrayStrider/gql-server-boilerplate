import {Service} from 'typedi'

@Service()
export default class Logger {
	
	log (...args: unknown[]) {
		
		// Replace with more sophisticated solution :)
		console.log(...args)
		
	}
	
}
