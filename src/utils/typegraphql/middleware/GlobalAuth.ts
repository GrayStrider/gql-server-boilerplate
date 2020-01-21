import {MiddlewareFn} from 'type-graphql'
import {Errors} from '@/utils/Errors'
import {Context} from '@/graphql'
import {HOST, PORT} from 'config/_consts'
import {RD} from '@/utils/libsExport'

export const publicFields = ['register', 'login']

export const GlobalAuth: MiddlewareFn<Context> =
	async ({context: {session, request: {headers, host}}, args, info, root}, next) => {

		const isAllowedOperation = publicFields.includes(info.fieldName)
		const unathorized = new Errors.Unathorized('Please log in or register to proceed')
		if (!session) throw unathorized
		const sessionIdPresent = RD.isNotNil(session.userId)
		const isInternalCall = headers.authorization === 'internal_call' && host === `${HOST}:${PORT}`

		if (sessionIdPresent || isAllowedOperation || isInternalCall) return next()
		throw unathorized

	}
