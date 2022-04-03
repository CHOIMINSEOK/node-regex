// [ab]*a[ab][ab]
// baaba

const initState = 0
const finalState = 3

// nfa could have several results
const finalStateResultGroup = []

const stateMatchTable = {
    0 : {
        'a' : [0, 1],
        'b' : [0]
    },
    1 : {
        'a' : [2],
        'b' : [2],
    },
    2 : {
        'a' : [3],
        'b' : [3],
    },
}

function runSimpleRegex(input) {
    reduce(initState, input)
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

        stateCandidates.forEach(sc => {
            state = reduce(sc, input.substring(1))
        })
    }

    return state
}

module.exports = {
    runSimpleRegex
}