const AST = require(process.argv[2]); // eslint-disable-line

if (!AST.type === 'program') {
  throw new Error('AST does not contain a valid program');
}

if (!AST.statements || !AST.statements.length) {
  throw new Error('program does not contain a valid statements');
}

const evaluateExpression = (expression) => {
  if (expression.type === 'literal') {
    return expression.value; // literal evaluates to its value
  }

  return undefined;
};

for (let i = 0; i < AST.statements.length; i += 1) {
  const statement = AST.statements[i];

  if (statement.type === 'return') {
    const expression = evaluateExpression(statement.expression);
    console.log(expression);
    break;
  }
}
