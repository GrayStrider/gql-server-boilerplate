import {Like} from 'typeorm'
import {AnyObject} from 'tsdef'

export const Like_ = (a: AnyObject, b: string) =>
	({[b]: Like(`%${a[b]}%`) as unknown as string})
