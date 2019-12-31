import {transform} from './transform'

it(`if len 1 and object has one key`, async () => {
	expect(transform([{key: 'value'}]))
		.toStrictEqual('value')
})


it(`if len > 1, and each object has only one key, return array of values`, async () => {
	expect(transform([{key: 'value'}, {key: 'value'}]))
		.toStrictEqual(['value', 'value'])
})

it(` same but not every value is object; should return initial value`, async () => {
	expect(transform([{key: 'value'}, {key: 'value'}, 'string']))
		.toStrictEqual([{'key': 'value'}, {'key': 'value'}, 'string'])
})

it(`if object and has only one key, should return value`, async () => {
	expect(transform({key: 'value'}))
		.toStrictEqual('value')
})

it(`if object and has many keys, should return as is`, async () => {
	expect(transform({key: 'value', key2: "value"}))
		.toStrictEqual({key: 'value', key2: "value"})
});

it(`another transform`, async () => {
	expect(transform([{key: 'value'}]))
		.toStrictEqual('value')
	expect(transform([{key: 'value'}, 'string']))
		.toStrictEqual([{key: 'value'}, 'string'])

});

it(`multiple objects with one key`, async () => {
	const input = {
		users: [
			{name: 'ivan'}
		]
	}
	// 1 - object and one key
	// 2 - if len 1 and object has one key
	expect(transform(input))
		.toStrictEqual('ivan')
});
