const Program = {
  evaluateExpression(expression, scope) {
    if (expression.type === 'literal') {
      return expression.value; // literal evaluates to its value
    }

    if (expression.type === 'built_in_function') {
      const [left, right] = expression.expressions.map((functionExpression) => (
        Program.evaluateExpression(functionExpression, scope)
      ));

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
      const calledFunction = scope.functions.get(expression.name);

      // map exery function call expression into a function definition parameter
      expression.expressions.forEach((param, i) => {
        const paramName = calledFunction.parameters[i];
        if (!paramName) return;

        const paramValue = Program.evaluateExpression(param, scope);
        scope.setVar(paramName, paramValue);
      });

      return Program.evaluateStatements('functionCall', calledFunction.statements, scope);
    }

    if (expression.type === 'parameter') {
      return scope.variables.get(expression.name);
    }

    return undefined;
  },

  evaluateStatements(level, statements, scope) {
    for (let i = 0; i < statements.length; i += 1) {
      const statement = statements[i];

      if (statement.type === 'function_definition') {
        scope.setFunction(statement.name, statement.parameters, statement.statements);
      }

      if (statement.type === 'if') {
        const evaluatedExpression = Program.evaluateExpression(statement.expression, scope);
        if (evaluatedExpression === true) {
          return Program.evaluateStatements('if', statement.statements, scope);
        }
      }

      if (statement.type === 'return') {
        const expression = Program.evaluateExpression(statement.expression, scope);

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
