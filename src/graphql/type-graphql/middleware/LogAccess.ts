import {Logger} from '@/graphql/typedi/services/Logger'
import {MiddlewareInterface, NextFn, ResolverData} from 'type-graphql'
import {Inject} from 'typedi'
import {Context} from '@/graphql'

export class LogAccess implements MiddlewareInterface<Context> {
	
	@Inject()
	logger: Logger
	
	async use ({context: {session}, info}: ResolverData<Context>, next: NextFn) {
		
		const username: string = session?.userId ?? 'guest'
		this.logger.log(
			`Logging access: ${username} -> ${String(info.parentType.name)}.${String(info.fieldName)}`
		)
		return next()
		
	}
	
}

