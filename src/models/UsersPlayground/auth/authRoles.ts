import {registerEnumType} from 'type-graphql'

enum AuthRoles {
	ADMIN = 'ADMIN'
}

registerEnumType(AuthRoles, {
	name: 'AuthRoles',
})

export default AuthRoles
