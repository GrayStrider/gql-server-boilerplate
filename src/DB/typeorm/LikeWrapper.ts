import {Like} from 'typeorm'
import {AnyObject} from 'tsdef'

export default function LikeWrapper (object: AnyObject, key: string) {

	return {[key]: Like(`%${String(object[key])}%`) as unknown as string}

}
