import {sleep, axios, bb} from '@/utils'
import {concat} from 'async'
import {prop, pipe, map, head, nth, match} from 'ramda'

async function main () {
	console.log('sleeping')
	const data = await bb.reduce(
		['https://google.com', 'https://twitter.com', 'fdf'],
		async (acc, url) => {
			const res = await axios.get(url).catch(() => null)
			if (!res) return acc
			
			const {data} = res
			
			const title = pipe(
				match(/<title>(.+)<\/title>/u),
				nth(1)
			)
			(data)
			
			return title ? acc.concat(title) : acc
		
		},
		[] as string[]
	)
	return data
	
}

main().then(console.log)

