import {throws} from 'assert'
import {MiddlewareFn, ResolverData} from 'type-graphql'
import {printUncaughtError} from '../../utils/log'
import {Error2, TypeORMError} from '../../utils/typeorm/customError'

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

export const ErrorInterceptor3: MiddlewareFn =
	async ({context, args, info, root}, next) => {
	try {
		return await next()
	} catch (e) {
		throw new TypeORMError(e.message, {name: e.name, args})
		
	}
}

export const ErrorInterceptor: MiddlewareFn =
	async ({context, args, info, root}, next) => {
	try {
		return await next()
	} catch (e) {
		throw e
		
	}
}

