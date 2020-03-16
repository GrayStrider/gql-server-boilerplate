import { AuthChecker } from 'type-graphql'
import { Context } from '@/graphql'

const authChecker: AuthChecker<Context> = ({
	                                           context,
	                                           args,
	                                           info,
	                                           root
                                           }, roles) => true

export default authChecker
