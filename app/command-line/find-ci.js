const fs = require('fs')
const puzzle = JSON.parse(fs.readFileSync('./puzzle.json').toString())
const { findAnswer } = require('../logic/solve.js')(puzzle)

if(puzzle && puzzle.answer)
  console.log(puzzle.answer)
else
  console.log(findAnswer())