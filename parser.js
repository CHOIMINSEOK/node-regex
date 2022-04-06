
const OP_QUANTIFIER = "*"

function parse(pattern) {
    // define initial state value as number for brevity
    const initState = 0

    // quantifier doesn't make additional state
    const finalState = pattern.replace(OP_QUANTIFIER, "").length - 1
    let stateMatchTable = {}

    let tmpState = initState
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === OP_QUANTIFIER) continue

        if (pattern[i+1] === OP_QUANTIFIER) {
            stateMatchTable = addRule(stateMatchTable, tmpState, pattern[i], tmpState)
        } else {
            stateMatchTable = addRule(stateMatchTable, tmpState, pattern[i], ++tmpState)
        }
    }

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