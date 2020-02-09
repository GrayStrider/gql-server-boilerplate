import {truncate} from 'lodash'
import {axios} from '@/utils'
import {map, prop, then, join, length, tap, pipe, pick, reduce, pickBy, append} from 'ramda'
import {AnyObject} from 'tsdef'

async function main () {
	
	const {data} = await axios.get<AnyObject[]>('https://api.github.com/users/GrayStrider/repos')
	
	const repos = data.reduce(
		(acc, curr) => {
			if (curr.archived) acc.archived.push(curr.name)
			else acc.repos.push(curr.name)
			
			return acc
		},
		{
			archived: [],
			repos: []
		}
	)
	
	return repos
	
}

main().then(console.log)
