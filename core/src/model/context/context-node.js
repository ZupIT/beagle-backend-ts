"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextNode = void 0;
const lodash_1 = require("lodash");
const set_context_1 = require("../../actions/set-context");
class ContextNode {
    path;
    constructor(path) {
        this.path = path;
    }
    toString() {
        return `@{${this.path}}`;
    }
    set(value, analytics) {
        const [, id, path] = this.path.match(/(\w+)\.?(.*)/) ?? [];
        if ((0, lodash_1.isEmpty)(id))
            throw new Error("Can't set context because context path is empty.");
        // @ts-ignore fixme: the analytics type is wrong, it wouldn't accept "route.url" for instance
        return (0, set_context_1.setContext)({ id, path, analytics, value });
    }
    at(index) {
        return new ContextNode(`${this.path}[${index}]`);
    }
    get(key) {
        return new ContextNode(`${this.path}.${key}`);
    }
}
exports.ContextNode = ContextNode;
