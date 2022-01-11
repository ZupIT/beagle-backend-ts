"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootContext = void 0;
const context_node_1 = require("./context-node");
class RootContext extends context_node_1.ContextNode {
    constructor(id, value) {
        super(id);
        this.value = value;
    }
    value;
}
exports.RootContext = RootContext;
