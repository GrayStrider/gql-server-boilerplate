import {MiddlewareFn} from 'type-graphql'
import {printUncaughtError, warn} from '../../utils/log'
import {Errors} from '../User/resolver'

export const ErrorInterceptor: MiddlewareFn = async (action, next) => {
	try {
		return await next()
	} catch (e) {
		if (e.constructor.name === "ExpectedError") {
			printUncaughtError("Constructor " + e.constructor.name)
			throw new Error("Intercepted: " + e.message)
		} else {
			console.log(e)
			throw new Error("Uncaught error, ID has been recorded: ")
		}
	}
}
