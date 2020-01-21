import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator'
import {AnyObject} from 'tsdef'

export function IsValidAge (minAge: number, validationOptions?: ValidationOptions) {

	return function ValidAge (object: AnyObject, propertyName: string) {

		registerDecorator({
			name: 'isLongerThan',
			target: object.constructor,
			propertyName,
			constraints: [minAge],
			options: validationOptions,
			validator: {
				validate (value: number, args: ValidationArguments) {

					const maxAge = 150
					const [min, max] = args.constraints
					return value > min && value < max && value < maxAge

				},
			},
		})

	}

}
