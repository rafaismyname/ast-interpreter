const Stack = {
  functions: new Map(),
  callParameters: new Map(),

  setCallParameters(parameters) {
    Object.keys(parameters).forEach((key) => Stack.callParameters.set(key, parameters[key]));
  },

  clearCallParameters() {
    Stack.callParameters = new Map();
  },
};

const Program = {
  evaluateExpression(expression) {
    if (expression.type === 'literal') {
      return expression.value; // literal evaluates to its value
    }

    if (expression.type === 'built_in_function') {
      const [left, right] = expression.expressions.map(Program.evaluateExpression);

      switch (expression.name) {
        case 'plus':
          return left + right;
        case 'minus':
          return left - right;
        case 'equal':
          return left === right;
        default:
          break;
      }
    }

    if (expression.type === 'function_call') {
      const calledFunction = Stack.functions.get(expression.name);
      const callParameters = expression.expressions.reduce((acc, param, i) => {
        const paramName = calledFunction.parameters[i];
        if (!paramName) return acc;

        return { ...acc, [paramName]: Program.evaluateExpression(param) };
      }, {});

      Stack.setCallParameters(callParameters);

      const evaluatedStatements = Program.evaluateStatements('functionCall', calledFunction.statements);

      Stack.clearCallParameters();

      return evaluatedStatements;
    }

    if (expression.type === 'parameter') {
      return Stack.callParameters.get(expression.name);
    }

    return undefined;
  },

  evaluateStatements(level, statements) {
    for (let i = 0; i < statements.length; i += 1) {
      const statement = statements[i];

      if (statement.type === 'function_definition') {
        Stack.functions.set(statement.name, {
          parameters: statement.parameters,
          statements: statement.statements,
        });
      }

      if (statement.type === 'return') {
        const expression = Program.evaluateExpression(statement.expression);

        if (level === 'program') {
          return console.log(expression);
        }

        return expression;
      }
    }

    return undefined;
  },
};

module.exports = Program;
