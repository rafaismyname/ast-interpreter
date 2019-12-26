const AST = require(process.argv[2]); // eslint-disable-line

if (!AST.type === 'program') {
  throw new Error('AST does not contain a valid program');
}

if (!AST.statements || !AST.statements.length) {
  throw new Error('program does not contain a valid statements');
}
