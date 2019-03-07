 'use strict'

module.exports = (puzzle) => {
    return {
        check,
        findAnswer,
        updatePuzzle
    }
    // Checks if the word is the correct pangram
    function check(word) {
        return word.toUpperCase() === puzzle.answer.toUpperCase()
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

    function updatePuzzle(newPuzzle) {
        return puzzle = newPuzzle
    }
}
