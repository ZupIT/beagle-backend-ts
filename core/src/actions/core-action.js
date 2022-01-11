"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoreAction = void 0;
const constants_1 = require("../constants");
const action_1 = require("../model/action");
const createCoreAction = (name) => ({ analytics, ...properties }) => new action_1.Action({ name, namespace: constants_1.coreNamespace, analytics, properties: properties });
exports.createCoreAction = createCoreAction;
