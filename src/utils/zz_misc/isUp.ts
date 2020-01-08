export async function isUp(url: string) {
	return await fetch(url).then((res) => res.status !== 400).catch((e) => !e)
}

