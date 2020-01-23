import {AuthChecker} from 'type-graphql'
import {Context} from '@/graphql'

export const authChecker: AuthChecker<Context> = ({
																										context,
																										args,
																										info,
																										root
																									}, roles) => true
