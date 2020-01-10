import {Context} from '@/graphql/apollo/context'
import {Logger} from '@/graphql/typedi/services/Logger'
import {MiddlewareInterface, NextFn, ResolverData} from 'type-graphql'
import {Inject} from 'typedi'

export class LogAccess implements MiddlewareInterface<Context> {
	@Inject()
	logger: Logger;
	
	async use({ context, info }: ResolverData<Context>, next: NextFn) {
		
		const username: string = context.username || "guest";
		this.logger.log(`Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`);
		return next();
	}
}

