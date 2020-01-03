import axios from 'axios'
import {json} from 'express'
import {pick} from 'ramda'
import {createConnection} from 'typeorm'
import {ORMConfig} from '../../config/_typeorm'
import {UserNew} from '../__typeorm reference/entity/User'
import {log} from './log'

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
		{where: pick(['id'], friends[1]), relations: ['friendsPrimary', 'friendsInverse']})
	console.log('Friend: ', friend)
	
	function sendResult<T = never>(send: any, result: NoInfer<T>) {
		send(result)
	}
	
	sendResult<{ test: string }>({foo: 'bar'}, {test: 'foo'})
	
	
	type NoInfer<T> = [T][T extends any ? 0 : never];
	
	
}

export async function howCommonIsName(firstName: string, lastName: string) {
	const res = await axios.get(`http://howmanyofme.com/people/${firstName}_${lastName}/`)
	const num = res.data.toString().match(/(\d+)(?=<\/span> (<b>or fewer<\/b> )?(people|person) in the U\.S\. named)/)
	if(num === undefined || num === null) return "ERROR: could't retrieve the data"
	return num[0] === '1' ? '1 or fewer' : num[0]
}


