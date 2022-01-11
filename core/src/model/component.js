"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const constants_1 = require("../constants");
class Component {
    constructor({ properties, children, context, id, name, namespace = constants_1.genericNamespace }) {
        this.id = id;
        this.children = children;
        this.context = context;
        this.properties = properties;
        this.name = name;
        this.namespace = namespace;
    }
    namespace;
    id;
    name;
    children;
    context;
    properties;
}
exports.Component = Component;
