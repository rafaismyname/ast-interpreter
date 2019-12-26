# AST Interpreter

#### How to run example programs:
```bash
npm start ../example-programs/program1.json
```
---

## Syntax
### Program Syntax
```json
{
  "type": "program",
  "statements": []
}
```
---

### Statement Syntax
There are 3 types of statements: `return`, `function_definition` and `if`

#### Return
```json
{
  "type": "return",
  "expression": {}
}
```
---
#### Function definition
```json
{
  "type": "function_definition",
  "name": "",
  "parameters": [],
  "statements": []
}
```
---
#### If
```json
{
  "type": "if",
  "expression": {},
  "statements": []
}
```
---

### Expression Syntax
There are 4 types of expressions: `literal`, `built_in_function`, `function_call` and `parameter`

#### Literal
```json
{
  "type": "literal",
  "value": ""
}
```
##### `value`: string or number
---
#### Built in function
```json
{
  "type": "built_in_function",
  "name": "",
  "expressions": []
}
```
##### `name`: `plus`, `minus` or `equal`
---
#### Function call
```json
{
  "type": "function_call",
  "name": "",
  "expressions": []
}
```
---
#### Parameter
```json
{
  "type": "parameter",
  "name": ""
}
```
