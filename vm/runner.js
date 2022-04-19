/**
 *
 * @param pc instructions as array
 * @param sp input text
 * @returns {any}
 */
const {Char, Match, Jmp, Split} = require("./op");

function runner(pc, sp) {
    // console.log(pc[0].op)
    const currentInstruction = pc[0]
    // console.log(currentInstruction)
    const currentChar = sp.charAt(0)

    switch (currentInstruction.op) {
        case Char:
            if (currentChar !== currentInstruction.c) return 0

            return runner(pc[1], sp.substring(1))
            break
        case Match:
            return 1
        case Jmp:
            return runner(currentInstruction.threadPointer1, sp)
        case Split:
            if (runner(currentInstruction.threadPointer1, sp)) return 1

            return runner(currentInstruction.threadPointer2, sp)
        default: throw Error()
    }

    return -1
}

module.exports = {
    runner
}