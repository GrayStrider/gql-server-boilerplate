// import axios from 'axios'
// import {print} from 'graphql'
//
// export const Request = async <T>(query: string, url: string): Promise<T> => {
// 	const {data} = await axios.post<T>(url, {query: print(query)})
// 	return data
// }
import {Like} from 'typeorm'

export const Like_: any = (a: { [key: string]: any }, b: string) =>
	({[b]: Like(`%${a[b]}%`) as unknown as string})
