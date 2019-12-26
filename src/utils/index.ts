// import axios from 'axios'
import {ASTNode, print} from 'graphql'
import request from 'graphql-request'
import {AnyObject} from 'tsdef'
// import {print} from 'graphql'
//
// export const Request = async <T>(query: string, url: string): Promise<T> => {
// 	const {data} = await axios.post<T>(url, {query: print(query)})
// 	return data
// }
import {Like} from 'typeorm'
import {GQL_URL} from '../../config/consts'

export const Like_: any = (a: { [key: string]: any }, b: string) =>
	({[b]: Like(`%${a[b]}%`) as unknown as string})

export const postQuery = async <T = AnyObject>(query: ASTNode, mainField?: string): Promise<T> => {
	const res: AnyObject = await request(GQL_URL, print(query))
	return mainField ? res?.[mainField] : res
}
