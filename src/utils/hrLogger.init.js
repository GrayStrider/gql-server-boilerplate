const fs = require('fs')
const R = require('ramda')

const logPath = './log.json'

const log = JSON.parse(fs.readFileSync(logPath).toString())

const initValue = {init: {start: process.hrtime()}}

fs.writeFileSync(logPath, JSON.stringify(R.mergeDeepLeft(initValue, log)))
