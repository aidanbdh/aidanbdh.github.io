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

fs.writeFileSync('./valid-words-hard.txt', JSON.stringify(filteredArray))

const easyList = JSON.parse(fs.readFileSync('./valid-words.txt', 'utf8'))

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

fs.writeFileSync('./valid-words.txt', JSON.stringify(filteredList))