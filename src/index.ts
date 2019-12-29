import {main} from './server'
import {printUncaughtError} from './utils/log'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

main().catch(printUncaughtError)

