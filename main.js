
const { runSimpleRegex } = require('./nfa/regex')
const {parse} = require("./vm/parser");
const {runner} = require("./vm/runner");

// console.log(runSimpleRegex('b*aa*a', 'bbbbaaa'))


console.log(runner(parse('b*a'), 'ba'))