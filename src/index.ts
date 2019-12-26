import {main} from './server'
import {warn} from './utils/log'

main().catch(err => {
	warn(err.message) })

