import {Like} from 'typeorm'
import {AnyObject} from 'tsdef'

export const LikeWrapper = (object: AnyObject, key: string) =>
	({[key]: Like(`%${object[key]}%`) as unknown as string})
