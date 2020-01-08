import {registerEnumType} from 'type-graphql'

export enum AuthRoles {
	ADMIN = 'ADMIN'
}

registerEnumType(AuthRoles, {
	name: 'AuthRoles'
})
