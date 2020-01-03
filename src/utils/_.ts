import {pick} from 'ramda'
import {createConnection} from 'typeorm'
import {ORMConfig} from '../../config/_typeorm'
import {UserNew} from '../__typeorm reference/entity/User'

async function main() {
	
	const conn = await createConnection(ORMConfig)
	const friends = await UserNew.find({skip: 20, take: 3})
	const user = await UserNew.findOne()
	
	const res = await conn.getRepository(UserNew)
		.merge(user!, {
			friendsPrimary: friends
		}).save()
	
	const again = await UserNew.findOne(user?.id, {relations: ['friendsPrimary']})
	console.log(res.friendsPrimary, again?.friendsPrimary)
	
	const friend = await UserNew.findOne(
		{where: pick(['id'],friends[1]), relations: ['friendsPrimary', 'friendsInverse']})
	console.log('Friend: ', friend)
	
	

}

// main().catch()

