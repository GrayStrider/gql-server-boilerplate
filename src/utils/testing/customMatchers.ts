import {Validator} from 'class-validator'

const check = new Validator()

function toBeUUID (str: string) {
	const pass = check.isUUID(str)
	if (pass) {
		return {
			message: () => `Expected value "${str}" NOT to be UUID`,
			pass: true
		}
	}
	return {
		message: () => `Expected value "${str}" to be UUID`,
		pass: false
	}
}


expect.extend({
	toBeUUID
})
