import jest from 'jest'

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeUUID (): R;
		}
		
		interface Expect<R> {
			toBeUUID (): R;
		}
	}
}
