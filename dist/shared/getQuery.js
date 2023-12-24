"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = void 0;
const getQuery = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.getQuery = getQuery;
