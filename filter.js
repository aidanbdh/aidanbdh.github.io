'use strict'

const fs = require('fs')

const wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n')

const filteredArray = wordArray.filter(word => {
    let letters = ''
    let num = 0

    if(word.length < 8)
        return false

    for(let i = 0; i < word.length; i++) {
        if(num > 7)
            return false

        if(letters.indexOf(word[i]) === -1) {
            letters += word[i]
            num++
        }
    }

    return num === 7 ? true : false
})

fs.writeFileSync('./valid-words-hard.json', JSON.stringify(filteredArray))

const easyList = require('./valid-words.json')

const filteredList = easyList.filter(word => {
    if(word.length < 8)
        return false

    if(word.indexOf('-') !== -1)
        return false
    let letters = ''
    let num = 0

    for (let i = 0; i < word.length; i++) {
        if (num > 7)
            return false

        if (letters.indexOf(word[i]) === -1) {
            letters += word[i]
            num++
        }
    }

    return num === 7 ? true : false
})

fs.writeFileSync('./valid-words.json', JSON.stringify(filteredList))