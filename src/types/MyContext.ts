import {Request, Response} from 'express'
import {createAuthorsLoader} from '@/graphql/dataloader/authorsLoader'

export interface MyContext {
	req: Request;
	res: Response;
	authorsLoader: ReturnType<typeof createAuthorsLoader>;
}
