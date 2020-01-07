import {Request, Response} from 'express'
import {dataSources} from './datasources'

export const context = ({req}: Omit<BaseContext, 'dataSources'>) => ({
	session : req.session,
})

interface BaseContext {
	req: Request,
	res: Response,
	dataSources: ReturnType<typeof dataSources>
	
}
export type Context = BaseContext & ReturnType<typeof context>
