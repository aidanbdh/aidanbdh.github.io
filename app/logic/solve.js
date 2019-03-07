 'use strict'

const fs = require('fs')

module.exports = (puzzle) => {
    return {
        check,
        findAnswer
    }
    // Checks if the word is the correct pangram
    function check(word) {
        return word === puzzle.answer
    }
    // Returns an array of possible answers to the pangram.
    function findAnswer() {
        return puzzle.words.filter(word => {
            for (let i = 0; i < puzzle.output.length; i++) {
                if (word.indexOf(puzzle.output[i].toLowerCase()) === -1)
                    return false
            }

            return true
        })
    }
}
