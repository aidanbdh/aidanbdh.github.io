'use strict'

const fs = require('fs')
const prompt = require('prompt')

prompt.start()

prompt.get('letters', (err, {letters}) => {
    const words = JSON.parse(fs.readFileSync('./valid-words.txt'))

    console.log('Possible Answers:')

    words.forEach(word => {
        for (let i = 0; i < letters.length; i++) {
            if (word.indexOf(letters[i]) === -1)
                return false
        }

        console.log(word)
    })
})