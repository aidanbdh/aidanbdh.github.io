'use strict'

const fs = require('fs')
const puzzle = require('../logic/generate.js')()

console.log('\t' + puzzle.output[2])
console.log(puzzle.output[1] + '\t\t' + puzzle.output[3])
console.log('\t' + puzzle.output[0])
console.log(puzzle.output[6] + '\t\t' + puzzle.output[4])
console.log('\t' + puzzle.output[5] + '\n')

console.log('Difficulty: ' + puzzle.difficulty + '\n')

fs.writeFileSync('./puzzle.json', JSON.stringify(puzzle))