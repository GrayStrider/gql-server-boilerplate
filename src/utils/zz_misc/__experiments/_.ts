import R, {pick, pipe, prop, then} from 'ramda'
import {createConnection} from 'typeorm'
import {ORMConfig} from '../../../../config/_typeorm'
import {UserNew} from '../../../models/UsersPlayground/entity/User'
import {bb} from '../../libsExport'

async function main() {
	
	const conn = await createConnection(ORMConfig)
	const friends = await UserNew.find({skip: 20, take: 3})
	const user = await UserNew.findOne()
	
	const res = await conn.getRepository(UserNew)
		.merge(user!, {
			friendsPrimary: friends,
		}).save()
	
	const again = await UserNew.findOne(user?.id, {relations: ['friendsPrimary']})
	console.log(res.friendsPrimary, again?.friendsPrimary)
	
	const friend = await UserNew.findOne(
		{where: pick(['id'], friends[1]), relations: ['friendsPrimary', 'friendsInverse']})
	console.log('Friend: ', friend)
	
	function sendResult<T = never>(send: any, result: NoInfer<T>) {
		send(result)
	}
	
	sendResult<{ test: string }>({foo: 'bar'}, {test: 'foo'})
	
	
	type NoInfer<T> = [T][T extends any ? 0 : never];
	
	
}

const number = R.until(R.gt(R.__, 100), (n) => {
	console.log(n)
	return R.multiply(2, n)
})(1)
console.log(number)

async function foo(): Promise<{ foo: string }> {
	
	return new bb(resolve => resolve({foo: 'baz'}))
}
