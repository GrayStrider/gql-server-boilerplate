import {axios, bb, RD} from '@/utils'
import {prop, pipe, map, nth, match} from 'ramda'

async function main () {
	console.log('sleeping')
	const urls = ['https://google.com', 'https://twitter.com', 'fdf']
	
	const data = await bb.all(urls.map(
		async (url) => axios.get(url)
			.catch(res => null)
	)).then(RD.compact)

	return pipe(
		() => map(pipe(
			prop('data'),
			match(/<title>(.+)<\/title>/u),
			nth(1)
		), data),
		RD.compact
	)()
}

main().then(console.log)

