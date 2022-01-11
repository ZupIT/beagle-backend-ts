"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const context_node_1 = require("../context/context-node");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Operation {
    constructor(name, args) {
        this.args = args;
        this.name = name;
    }
    name;
    args;
    asString(includeDelimiters) {
        const argumentsAsStrings = this.args.map(item => {
            if (item instanceof Operation)
                return item.asString(false);
            if (item instanceof context_node_1.ContextNode)
                return item.path;
            return item ? item.toString() : 'null';
        });
        const expression = `${this.name}(${argumentsAsStrings.join(', ')})`;
        return includeDelimiters ? `@{${expression}}` : expression;
    }
    toString() {
        return this.asString(true);
    }
}
exports.Operation = Operation;
