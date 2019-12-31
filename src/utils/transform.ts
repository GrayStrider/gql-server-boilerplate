

export function transform(input: object | any[]) {
	
	if (Array.isArray(input)) {
		return flattenAray(input)
	} else {
		const res = flattenObject(input)
		return flattenAray(res)
	}
	
}

export function flattenAray(input: any[]) {
	if (Array.isArray(input)) {
		return input.length === 1
			? flattenObject(input[0])
			: input.every((object) =>
				Object.keys(object).length === 1)
				? input.map((object) =>
					flattenObject(object))
				: input
	}
	return input
}

export function flattenObject(input: object) {
	
	return Object.keys(input).length > 1
		? input
		: Object.values(input)[0]
}
