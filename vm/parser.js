/**
 * Parse regular expression as Instruction
 * Currently only support `*`
 * @param re
 */
const {Thread} = require("./thread");
const {Jmp, Char, Match, Split} = require("./op");

function parse(re) {
    const pc = []
    for (let i = 0; i < re.length; i++) {
        const c = re.charAt(i)
        if (c === '*') {
            const char = makeChar(re.charAt(i-1))
            const match = makeMatch()

            const split = makeSplit(char, match)

            const jmp = makeJump(split)

            pc.push(split)
            pc.push(char)
            pc.push(jmp)
            pc.push(match)
        } else {
            const char = makeChar(re.charAt(i))
            pc.push(char)

        }
    }

    return pc
}

function makeChar(c) {
    const char = new Thread()
    char.op = Char
    char.c = c

    return char
}

function makeMatch(){
    const match = new Thread()
    match.op = Match

    return match
}

function makeSplit(l1, l2) {
    const split = new Thread()
    split.op = Split
    split.threadPointer1 = l1
    split.threadPointer2 = l2
    return split
}

function makeJump(l1) {
    const jmp = new Thread()
    jmp.op = Jmp
    jmp.threadPointer1 = l1

    return jmp
}


module.exports = {
    parse
}