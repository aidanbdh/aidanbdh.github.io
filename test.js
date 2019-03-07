 'use strict'

const fs = require('fs')
const prompt = require('prompt')

console.log('Input a panagram: ')

prompt.start()

prompt.get('word', (err, {word}) => {
    const answer = fs.readFileSync('./answers.txt').toString()

    if(answer == word)
        console.log('Congratulations! That is the panagram! Run npm start to generate a new one.')
    else
        console.log('That is not the panagram, but good try!')
})