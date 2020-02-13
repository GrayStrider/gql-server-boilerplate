import {axios} from '@/utils'
import {reduceBy} from 'ramda'

async function main () {
	interface Repo {
		archived: boolean
		
		name: string
	}
	
	const {data} = await axios.get<Repo[]>
	('https://api.github.com/users/GrayStrider/repos')
	
	return reduceBy(
		(acc, {name}) => acc.concat(name),
		[] as string[],
		repo => repo.archived ? 'archived' : 'repos',
		data
	)
	
}

main().then(console.log)
