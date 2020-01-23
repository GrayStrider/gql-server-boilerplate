/**
 * Extra fields get added into
 * extensions -> exception
 * of GraphQL error
 */

class Error2 extends Error {
	
	constructor (public newField: string, message: string) {
		
		super(message)
		
	}
	
}

export default class TypeORMError extends Error {
	
	constructor (message: string, public data: object) {
		
		super(message)
		
	}
	
}
