import {axios, bb} from '@/utils'
import {pipe, nth, match} from 'ramda'

async function main () {
	console.log('sleeping')
	const data = await bb.reduce(
		['https://google.com', 'https://twitter.com', 'fdf'],
		async (acc, url) => {
			const res = await axios.get(url).catch(() => null)
			if (!res) return acc
			
			const {data} = res
			
			const match = /<title>(?<title>.+)<\/title>/u
				.exec(data)
			const title = match?.groups?.title
			
			return title ? acc.concat(title) : acc
			
		},
		[] as string[]
	)
	return data
	
}

main().then(console.log)

