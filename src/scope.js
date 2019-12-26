function Scope(parent) {
  this.functions = parent ? parent.functions : new Map();
  this.variables = parent ? parent.variables : new Map();
  this.parent = parent;
}

Scope.prototype.setFunction = function setFunction(name, parameters, statements) {
  this.functions.set(name, { parameters, statements });
};

Scope.prototype.setVar = function setVar(name, value) {
  this.variables.set(name, value);
};

module.exports = Scope;
