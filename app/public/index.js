'use strict'

const generate = require('../logic/generate.js')

let puzzle = generate()

const scripts = require('../logic/solve.js')(puzzle)

const $generate = document.getElementById('generate')
const $puzzle = document.getElementById('puzzle')

$generate.addEventListener('click', () => {
    puzzle = generate()
    scripts.updatePuzzle(puzzle)

    displayPuzzle()
})

const $answerInput = document.getElementById('answer-input')
const $checkAnswer = document.getElementById('check-answer')
const $results = document.getElementById('results')

$checkAnswer.addEventListener('click', () => {
    const text = $answerInput.value

    if(scripts.check(text))
        $results.textContent = 'That is the pangram! Congradulations!'
    else
        $results.textContent = 'That is not the pangram, try again.'

    $results.classList = ''
})

const $showAnswer = document.getElementById('show-answer')
const $answer = document.getElementById('answer')
const $hideAnswer = document.getElementById('hide-answer')

$showAnswer.addEventListener('click', () => {
    $answer.textContent = puzzle.answer

    $showAnswer.classList = 'hidden'
    $answer.classList = ''
    $hideAnswer.classList = ''
})

$hideAnswer.addEventListener('click', () => {
    $answer.classList = 'hidden'
    $hideAnswer.classList = 'hidden'
    $showAnswer.classList = ''
})

// This function displays the puzzle along with the difficulty.
function displayPuzzle() {
    const str = '\n\t' + puzzle.output[2] + 
        '\n' + puzzle.output[1] + '\t\t' + puzzle.output[3] + 
        '\n\t' + puzzle.output[0] + 
        '\n' + puzzle.output[6] + '\t\t' + puzzle.output[4] +
        '\n\t' + puzzle.output[5] + 
        '\n\nDifficulty: ' + puzzle.difficulty + '\n\n '
    
    $puzzle.textContent = str

    $answerInput.value = ''
    $results.classList = 'hidden'

    $answer.textContent = ''

    $answer.classList = 'hidden'
    $hideAnswer.classList = 'hidden'
    $showAnswer.classList = ''
}

displayPuzzle()
