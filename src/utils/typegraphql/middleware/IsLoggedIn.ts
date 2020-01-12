import {MiddlewareFn} from 'type-graphql'
import {Context2} from '@/server'
import {Errors} from '@/utils/Errors'

export const publicFields = ['register', 'login']

export const IsLoggedIn: MiddlewareFn<Context2> =
	async ({context: {ctx: {session}, ctx}, args, info, root}, next) => {
		const allowedOperation = publicFields.includes(info.fieldName)
		const sessionIdPresent = session!.userId
		if (!(sessionIdPresent || allowedOperation))
			throw new Errors.Unathorized('Please log in or register to proceed')
		return await next()
	}
