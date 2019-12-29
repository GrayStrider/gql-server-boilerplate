import {MiddlewareFn} from 'type-graphql'
import {printUncaughtError} from '../../utils/log'
import {Error2} from '../../utils/typeorm/customError'

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
	

	return res
}

