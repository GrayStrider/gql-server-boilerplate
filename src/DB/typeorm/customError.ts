/**
 * extra fields get added into
 * extensions -> exception
 * of GraphQL error
 */
import {ResolverData} from 'type-graphql'

export class Error2 extends Error {
	constructor(public newField: string, message: string) {
		super(message)
	}
}

export class TypeORMError extends Error {
	constructor(message: string, public data: object) {
		super(message)
	}
}
