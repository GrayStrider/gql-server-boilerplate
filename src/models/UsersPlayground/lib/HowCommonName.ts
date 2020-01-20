import axios from 'axios'

export async function howCommonIsName (firstName: string, lastName: string) {

	const res = await axios.get(`http://howmanyofme.com/people/${firstName}_${lastName}/`)
	const num = res.data.toString().match(/(?:\d+)(?=<\/span> (?:<b>or fewer<\/b> )?(?:people|person) in the U\.S\. named)/u)
	if (num === undefined || num === null) throw new Error('could\'t retrieve the data')
	return num[0] === '1' ? '1 or fewer' : num[0]

}
