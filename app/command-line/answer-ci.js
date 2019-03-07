'use strict'

const fs = require('fs')
const { answer } = JSON.parse(fs.readFileSync('./puzzle.json').toString())

console.log(answer)