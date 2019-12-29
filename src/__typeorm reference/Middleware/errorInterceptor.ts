import {MiddlewareFn} from 'type-graphql'
import {printUncaughtError} from '../../utils/log'

export const ErrorInterceptor2: MiddlewareFn = async (action, next) => {
	try {
		return await next()
	} catch (e) {
		if (e.constructor.name === 'ExpectedError') {
			printUncaughtError('Constructor ' + e.constructor.name)
			throw new Error('Intercepted: ' + e.message)
		} else {
			console.log(e)
			throw new Error('Uncaught error, ID has been recorded: ')
		}
	}
}

export const ErrorInterceptor: MiddlewareFn = async (action, next) => {
	const res = await next()
	const act = action
	
	class Error2 extends Error {
		constructor(public newField: string, message: string) {
			super(message)
		}
	}
	
	throw new Error2("test", "new Error")
	return res
}

