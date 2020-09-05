"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_code_1 = require("../action-code");
function generateBackButtons(actionCode, options) {
    const { depth, hasMainMenu, backButtonText, mainMenuButtonText } = options;
    if (actionCode === 'main' || depth === 0) {
        return [];
    }
    const buttons = [];
    if (depth > 1 && backButtonText) {
        buttons.push({
            text: backButtonText,
            action: new action_code_1.default(actionCode).parent().getString(),
            root: true
        });
    }
    if (depth > 0 && hasMainMenu && mainMenuButtonText) {
        buttons.push({
            text: mainMenuButtonText,
            action: 'main',
            root: true
        });
    }
    return buttons;
}
exports.generateBackButtons = generateBackButtons;
//# sourceMappingURL=back-and-main.js.map