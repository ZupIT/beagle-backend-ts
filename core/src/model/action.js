"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = exports.Action = void 0;
const constants_1 = require("../constants");
class Action {
    constructor({ name, analytics, namespace = constants_1.genericNamespace, properties }) {
        this.name = name;
        this.namespace = namespace;
        this.analytics = analytics;
        this.properties = properties;
    }
    namespace;
    name;
    properties;
    analytics;
}
exports.Action = Action;
const createAction = (name, namespace) => ({ analytics, ...properties }) => new Action({ name, namespace, analytics, properties: properties });
exports.createAction = createAction;
