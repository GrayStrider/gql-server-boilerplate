import {MiddlewareFn} from 'type-graphql'
import {warn} from '../../utils/log'

export const ErrorInterceptor: MiddlewareFn = async (action, next) => {
	try {
		return await next()
	} catch (e) {
		throw new Error("Intercepted: " + e.message)
	}
}
