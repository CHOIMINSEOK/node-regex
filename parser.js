
const OP_QUANTIFIER = "*"

function parse(pattern) {
    // define initial state value as number for brevity
    const initState = 0

    let stateMatchTable = {}

    let currentState = initState
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === OP_QUANTIFIER) continue

        if (pattern[i+1] === OP_QUANTIFIER) {
            stateMatchTable = addRule(stateMatchTable, currentState, pattern[i], currentState)
        } else {
            stateMatchTable = addRule(stateMatchTable, currentState, pattern[i], ++currentState)
        }
    }

    const finalState = currentState
    return {
        initState, finalState, stateMatchTable
    }
}

function addRule(table, state, value, nextState) {
    if (table[state]) {
        table[state][value] = [nextState]
    } else {
        table[state] = {
            [value]: [nextState]
        }
    }

    return table
}


module.exports = {
    parse
}