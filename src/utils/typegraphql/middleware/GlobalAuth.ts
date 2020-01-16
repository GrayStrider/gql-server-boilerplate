import {MiddlewareFn} from 'type-graphql'
import {Errors} from '@/utils/Errors'
import {Context} from '@/graphql'
import {HOST, PORT} from 'config/_consts'

export const publicFields = ['register', 'login']

export const GlobalAuth: MiddlewareFn<Context> =
	async ({context: {session, request: {headers, host}}, args, info, root}, next) => {
	
		const allowedOperation = publicFields.includes(info.fieldName)
		const sessionIdPresent = session!.userId
		const isInternalCall = headers.authorization === 'internal_call' && host === `${HOST}:${PORT}`
		
		if (sessionIdPresent || allowedOperation || isInternalCall)
			return await next()
		throw new Errors.Unathorized('Please log in or register to proceed')
	}
