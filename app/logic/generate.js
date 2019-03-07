'use strict'

const fs = require('fs')
const shuffleWords = require('shuffle-words')

const words = JSON.parse(fs.readFileSync('./valid-words.txt'))

module.exports = () => {
    const random = Math.floor(Math.random() * words.length - 1)

    const word = words[random]
        .split('')
        .filter((el, i) => words[random].indexOf(el) === i ? true : false)
        .join('')

    fs.writeFileSync('./answers.txt', words[random])

    let output = shuffleWords(word, true).toUpperCase()

    while (!checkLetter(output[0]))
        output = shuffleWords(word, true)

    return {
        answer: words[random],
        output,
        difficulty: Number.parseInt(('' + random)[0]) + 1,
        words
    }
}

function checkLetter(letter) {
    const banList = 'xszjwq' // List of letters to not use as the starter
    return banList.indexOf(letter.toLowerCase()) === -1
}