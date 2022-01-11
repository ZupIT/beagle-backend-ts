"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const root_context_1 = require("./root-context");
function createContext(id, value) {
    return new root_context_1.RootContext(id, value);
}
exports.createContext = createContext;
