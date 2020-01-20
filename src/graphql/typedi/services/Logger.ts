import {Service} from 'typedi'

@Service()
export class Logger {
	log(...args: unknown[]) {
		// replace with more sophisticated solution :)
		console.log(...args)
	}
}
