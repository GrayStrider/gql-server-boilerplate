import {MiddlewareFn} from 'type-graphql'
import {Errors} from '@/utils/Errors'
import {Context} from '@/graphql'

export const publicFields = ['register', 'login']

export const IsLoggedIn: MiddlewareFn<Context> =
	async ({context: {session}, args, info, root}, next) => {
		const allowedOperation = publicFields.includes(info.fieldName)
		const sessionIdPresent = session!.userId
		if (!(sessionIdPresent || allowedOperation))
			throw new Errors.Unathorized('Please log in or register to proceed')
		return await next()
	}
