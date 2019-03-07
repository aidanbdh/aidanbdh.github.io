'use strict'

const fs = require('fs')
const prompt = require('prompt')
const puzzle = JSON.parse(fs.readFileSync('./puzzle.json').toString())
const { check } = require('../logic/solve.js')(puzzle)

console.log('Input a panagram: ')

prompt.start()

prompt.get('word', (_, { word }) => {
    if(check(word))
        console.log('Congratulations! That is the panagram! Run npm start to generate a new one.')
    else
        console.log('That is not the panagram, but good try!')
})