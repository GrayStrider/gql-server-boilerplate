import {IsEmail} from 'class-validator'
import {UserNew} from '@/models'
import {Errors} from '@/utils'

const IsValidEmail = IsEmail({}, {message: 'Invalid email format'})
const birthYearFromAge = (age: number) => new Date().getFullYear() - age

const validatePassword = (password: string): true => {

	if (password.length < 6) throw new Errors.Validation('Password must contain...')
	
	return true
	
}

type UserCreateType = Partial<Omit<UserNew, 'age'>> & { age: number }

export {
	IsValidEmail,
	UserCreateType,
	birthYearFromAge,
	validatePassword
}
