/**
 * extra fields get added into
 * extensions -> exception
 * of GraphQL error
 */
export class Error2 extends Error {
	constructor(public newField: string, message: string) {
		super(message)
	}
}
