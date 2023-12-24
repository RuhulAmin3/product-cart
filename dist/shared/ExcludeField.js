"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeField = void 0;
const excludeField = (data, keys) => {
    for (let key of keys) {
        delete data[key];
    }
    return data;
};
exports.excludeField = excludeField;
