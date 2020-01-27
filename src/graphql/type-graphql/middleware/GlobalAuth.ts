import {MiddlewareFn} from 'type-graphql'
import {Errors, RD} from '@/utils'
import {Context} from '@/graphql'
import {HOST, PORT} from '@config'

const publicFields = ['register', 'login']

const globalAuth: MiddlewareFn<Context> =
	async function ({context, args, info, root}, next) {

		const {session, request: {headers, host}} = context
		const isAllowedOperation = publicFields.includes(info.fieldName)
		const unathorized = new Errors.Unathorized('Please log in or register to proceed')
		if (!session) throw unathorized
		const sessionIdPresent = RD.isNotNil(session.userId)
		const isInternalCall = headers.authorization === 'internal_call' && host === `${HOST}:${PORT}`
		
		if (sessionIdPresent || isAllowedOperation || isInternalCall) return next()
		throw unathorized
		
	}

export default globalAuth
