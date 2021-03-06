// [ab]*a[ab][ab]
// baaba

const { parse } = require('./parser')

let initState
let finalState
let stateMatchTable

// nfa could have several results
const finalStateResultGroup = []


function runSimpleRegex(pattern, input) {
    const parsedRule = parse(pattern)

    initState = parsedRule.initState
    finalState = parsedRule.finalState
    stateMatchTable = parsedRule.stateMatchTable

    console.log(initState)
    console.log(finalState)
    console.log(stateMatchTable)
    console.log('=============')

    reduce(initState, input)

    console.log(finalStateResultGroup)
    return finalStateResultGroup.includes(finalState)
}

function reduce(currentState, input) {
    const inputLength = input.length
    let state = currentState

    // if traverse is finished, keep it as final result
    if(input.length === 0) {
        finalStateResultGroup.push(currentState)
    }

    if (currentState === finalState) {
        return finalState
    }

    for(let i=0; i < inputLength; i++) {

        // finish loop if state becomes final state before traversing all input
        if (state === finalState) {
            return finalState
        }

        const transferRule = stateMatchTable[state]
        const stateCandidates = transferRule[input[i]]

        stateCandidates?.forEach(sc => {
            state = reduce(sc, input.substring(1))
        })
    }

    return state
}

module.exports = {
    runSimpleRegex
}