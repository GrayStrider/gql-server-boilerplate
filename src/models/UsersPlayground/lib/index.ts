import {IsEmail} from 'class-validator'
import {UserNew} from '@/models/UsersPlayground'

const IsValidEmail = IsEmail({}, {message: 'Invalid email format'})
type UserCreateType = Partial<Omit<UserNew, 'age'>> & { age: number }

export {IsValidEmail, UserCreateType}
