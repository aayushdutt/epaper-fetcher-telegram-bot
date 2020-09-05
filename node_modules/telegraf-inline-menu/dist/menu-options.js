"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_code_1 = require("./action-code");
function normalizeOptions(userOptions) {
    if (userOptions.actionCode && userOptions.actionCode.includes(':')) {
        throw new Error('ActionCode has to start at the base level (without ":")');
    }
    const actionCode = new action_code_1.default(userOptions.actionCode || 'main');
    const hasMainMenu = actionCode.get() === 'main';
    const depth = hasMainMenu ? 0 : 1;
    const internalOptions = {
        hasMainMenu,
        depth,
        backButtonText: userOptions.backButtonText,
        mainMenuButtonText: userOptions.mainMenuButtonText,
        log: userOptions.log || (() => { })
    };
    return {
        actionCode,
        internalOptions
    };
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=menu-options.js.map