// [ab]*a[ab][ab]
// baaba

const initState = 0
const finalState = 3

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
    3 : {
        'a' : [3],
        'b' : [3],
    }
}

function runSimpleRegex(input) {
    let currentState = initState

    currentState = reduce(currentState, input)

    return currentState === finalState
}

function reduce(currentState, input) {
    console.log(`state: ${currentState}, input: ${input}`)
    const inputLength = input.length
    let state = currentState
    for(let i=0; i < inputLength-1; i++) {

        const transferRule = stateMatchTable[state]
        const stateCandidates = transferRule[input[i]]

        stateCandidates.forEach(sc => {
            if (sc === finalState) state = finalState
            state = reduce(sc, input.substring(1))
        })
    }

    return state
}




module.exports = {
    runSimpleRegex
}