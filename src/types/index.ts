import { Stream } from 'stream'

type Await<T> = T extends {
	then (onfulfilled?: (value: infer U) => unknown): unknown
} ? U : T

interface Upload {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => Stream
}

/* Get one property of type */
type P<T, K extends keyof T> = T[K]
export { Await, Upload, P }
