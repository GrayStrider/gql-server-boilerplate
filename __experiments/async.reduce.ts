import {axios, bb} from '@/utils'

const urls = ['https://google.com', 'https://twitter.com', 'fdf']

async function main () {
	console.log('sleeping')
	return bb.reduce(
		urls, async (acc, url) => {
			const res = await axios.get(url)
				.catch(() => null)
			if (!res) return acc

			const {title} = /<title>(?<title>.+)<\/title>/u
				.exec(res.data)?.groups ?? {}
			
			return title ? acc.concat(title) : acc
			
		},
		[] as string[]
	)
	
}

main().then(console.log)

