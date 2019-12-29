import chalk from 'chalk'
import gql from 'graphql-tag'
import {createConnection, Like} from 'typeorm'
import {ORMConfig} from '../../config/_typeorm'
import {Task} from '../entity/KBF/Task'
import {warn} from '../utils/log'
import {postQuery} from '../utils/apollo, graphql/postQuery'

const main = async () => {
	const conn = await createConnection({...ORMConfig, name: 'typeorm'})
	const db = conn.manager
	await conn.synchronize(true)

  for (let i = 0; i < 10; i++) {
    await postQuery(gql`mutation {
        taskCreate(title: "task_${i === 3 ? 'FOO' : i}") {
            id
        }
    }`)
  }


  // operators work only with connections manager
  // Task.find({title: IsNull()}).then(warn)
  // await db.find(Task, {title: 'test2'}).then(warn)
  // await db.update(Task, {title: 'test'}, {title: 'updated'}).then(warn)
  // await db.delete(Task, {title: "updated"})
	
	
	/**
	 * Which means you should use remove if it contains an array of Entities.
	 * While you should use delete if you know the condition.
	 */
	const [all, count] = await db.findAndCount(Task)
	warn(all, count)
	const tasks = await db.find(Task, {where: {title: Like('FOO')}})
	const titles = tasks.map((task) => task.title)
	warn(titles)
	
	await db.delete(Task, {title: Like('3')})
	await db.find(Task, {title: Like('task')})
		.then(tasks => console.log(chalk.red(tasks)))
		.catch(warn)

  // const tasks = await db.find(Task).then((tasks) => tasks.map((task) => task.title))
  // warn(tasks)

}

// console.log('test')
// main().catch(warn)
