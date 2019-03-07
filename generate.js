'use strict'

const fs = require('fs')
const shuffleWords = require('shuffle-words')

const words = JSON.parse(fs.readFileSync('./valid-words.txt'))

const random = Math.floor(Math.random() * words.length - 1)

const word = words[random]
    .split('')
    .filter((el, i) => words[random].indexOf(el) === i ? true : false)
    .join('')

fs.writeFileSync('./answers.txt', words[random])

let output = shuffleWords(word, true).toUpperCase()

while(!checkLetter(output[0]))
    output = shuffleWords(word, true)

console.log('\t' + output[2])
console.log(output[1] + '\t\t' + output[3])
console.log('\t' + output[0])
console.log(output[6] + '\t\t' + output[4])
console.log('\t' + output[5] + '\n')

console.log('Difficulty: ' + (Number.parseInt(('' + random)[0]) + 1) + '\n')

// console.log('\t' + output[1] + '\t\t' + output[2] + '\n')
// console.log(output[6] + '\t\t' + output[0] + '\t\t' + output[3] + '\n')
// console.log('\t' + output[5] + '\t\t' + output[4])


function checkLetter(letter) {
    const banList = 'xszjwq'
    return banList.indexOf(letter.toUpperCase()) === -1
}