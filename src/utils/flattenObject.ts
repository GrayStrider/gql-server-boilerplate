
export function flattenObject(input: object) {
	
	return Object.keys(input).length > 1
		? input
		: Object.values(input)[0]
}
