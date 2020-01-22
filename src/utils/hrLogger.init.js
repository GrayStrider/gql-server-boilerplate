const fs = require('fs')
const R = require('ramda')

const logPath = './log.json'

const log = JSON.parse(fs.readFileSync(logPath).toString())

const initValue = {init: {time: process.hrtime()[0]}}

fs.writeFileSync(logPath, JSON.stringify(initValue, null, 2))
