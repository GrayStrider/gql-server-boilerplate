import {Like} from 'typeorm'

export const Like_: any = (a: { [key: string]: any }, b: string) =>
	({[b]: Like(`%${a[b]}%`) as unknown as string})
