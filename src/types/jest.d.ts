import jest from 'jest'

declare global {
	namespace jest {
		interface Matchers<R, T> {
			toBeUUID (): R
		}
	}
}
