import gql from 'graphql-tag'
import {createConnection, IsNull, Not} from 'typeorm'
import {ORMConfig} from '../../config/typeorm'
import {Task} from '../entity/KBF/Task'
import {postQuery} from '../utils'
import {warn} from '../utils/log'

const main = async () => {
	const conn = await createConnection({...ORMConfig, name: "typeorm"})
	await conn.synchronize(true)
	
	await postQuery(gql`mutation {
      one: taskCreate(title: "test") {
          id
      }
      two: taskCreate(title: "test2") {
          id
      }



  }`)
	
	// operators work only with connections manager
	// Task.find({title: IsNull()}).then(warn)
	await conn.manager.find(Task, {title: "test2"}).then(warn)
	await conn.manager.update(Task,{title: "test"}, {title: "updated"}).then(warn)
	await conn.manager.find(Task, {title: "updated"}).then(warn)

	
}

// console.log('test')
main().catch(warn)
