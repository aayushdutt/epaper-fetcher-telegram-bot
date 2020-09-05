"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_keyboard_button_1 = require("./build-keyboard-button");
async function buildKeyboard(content, actionCodePrefix, ctx) {
    const resultButtons = await Promise.all(content.map(async (row) => {
        if (typeof row === 'function') {
            const innerKeyboard = await row(ctx);
            return Promise.all(innerKeyboard.map(async (innerRow) => buildKeyboardRow(innerRow, actionCodePrefix, ctx)));
        }
        return [await buildKeyboardRow(row, actionCodePrefix, ctx)];
    }));
    const resultButtonsFlatted = resultButtons
        // .flat(1) requires NodeJS 11 / ES2019. This would be nice but is to far away for now.
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
        .filter(o => o.length > 0);
    return {
        inline_keyboard: resultButtonsFlatted
    };
}
exports.buildKeyboard = buildKeyboard;
async function buildKeyboardRow(row, actionCodePrefix, ctx) {
    const buttons = await Promise.all(row.map(async (buttonInfo) => build_keyboard_button_1.buildKeyboardButton(buttonInfo, actionCodePrefix, ctx)));
    const withoutHidden = buttons
        .filter(o => o !== undefined);
    return withoutHidden;
}
//# sourceMappingURL=build-keyboard.js.map