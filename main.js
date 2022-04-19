
const { runSimpleRegex } = require('./nfa/regex')

console.log(runSimpleRegex('b*aa*a', 'bbbbaaa'))