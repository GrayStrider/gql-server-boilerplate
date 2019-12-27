import {validate as Validate} from 'class-validator'
import {BaseEntity, DeepPartial} from 'typeorm'

/**
 * class-validator wrapper
 * @param target class decorated with class-validator
 */
export async function validate<T extends Object>(target: T): Promise<T> {
	const errors = await Validate(target)
	if (errors.length > 0) {
		throw new Error(`Failled the following constraints:
		${errors.map((error) => JSON.stringify(error.constraints, null, 3))}`)
	} else {
		return target
	}
}

/**
 * validate and save typeorm class
 * @param target typeorm class, decorated with class-validator
 */
export async function validateAndSave<T extends BaseEntity>(target: T): Promise<T> {
	await validate(target)
	return await target.save().catch((error) => { throw new Error(error.message + "; " + error.detail) })
}
