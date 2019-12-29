import {Request, Response} from 'express'
import {createAuthorsLoader} from '../utils/dataloader/authorsLoader'

export interface MyContext {
	req: Request;
	res: Response;
	authorsLoader: ReturnType<typeof createAuthorsLoader>;
}
