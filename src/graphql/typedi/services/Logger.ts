import {Service} from 'typedi'

@Service()
export class Logger {

	log (...args: unknown[]) {

		// Replace with more sophisticated solution :)
		console.log(...args)

	}

}
