"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_code_1 = require("./action-code");
const ACTION_DYNAMIC_CONCAT_CHAR = '-';
class DuplicateActionGuardian {
    constructor() {
        this._static = [];
        this._dynamic = [];
    }
    addStatic(action) {
        if (action.endsWith(ACTION_DYNAMIC_CONCAT_CHAR)) {
            throw new Error('action can not end with a ' + ACTION_DYNAMIC_CONCAT_CHAR);
        }
        if (this._static.includes(action)) {
            throw new Error('Action already defined');
        }
        const conflicts = this._dynamic
            .filter(o => action.startsWith(o))
            .map(o => o.slice(0, -1));
        if (conflicts.length > 0) {
            throw new Error('The given action could be matched by existing actions: ' + conflicts.join('; '));
        }
        this._static.push(action);
        return new action_code_1.default(action);
    }
    addDynamic(action) {
        if (action.endsWith(ACTION_DYNAMIC_CONCAT_CHAR)) {
            throw new Error('action can not end with a ' + ACTION_DYNAMIC_CONCAT_CHAR);
        }
        const actionWithConcat = action + ACTION_DYNAMIC_CONCAT_CHAR;
        if (this._dynamic.includes(actionWithConcat)) {
            throw new Error('Action already defined');
        }
        const dynamicConflicts = this._dynamic
            .filter(o => o.startsWith(actionWithConcat) || actionWithConcat.startsWith(o))
            .map(o => o.slice(0, -1));
        const staticConflics = this._static
            .filter(o => o.startsWith(actionWithConcat));
        const conflicts = [
            ...dynamicConflicts,
            ...staticConflics
        ];
        if (conflicts.length > 0) {
            throw new Error('There is already an action that conflicts with this action: ' + conflicts.join('; '));
        }
        this._dynamic.push(actionWithConcat);
        return new action_code_1.default(new RegExp(`${action}-([^:]+)`));
    }
}
exports.default = DuplicateActionGuardian;
//# sourceMappingURL=duplicate-action-guardian.js.map