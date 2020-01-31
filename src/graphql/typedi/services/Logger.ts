import {Service} from 'typedi'

@Service()
export default class Logger {

	static logs: unknown[]
	
	
	log (...args: unknown[]) {
		
		// Replace with more sophisticated solution :)
		log(args)
		
	}
	
}

export const log = jest.fn()
