const AST = require(process.argv[2]); // eslint-disable-line
const Scope = require('./scope');
const Program = require('./program');

if (!AST.type === 'program') {
  throw new Error('AST does not contain a valid program');
}

if (!AST.statements || !AST.statements.length) {
  throw new Error('program does not contain a valid statements');
}

const globalScope = new Scope(); // init global scope

Program.evaluateStatements('program', AST.statements, globalScope);
