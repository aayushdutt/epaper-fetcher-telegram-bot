"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_keyboard_1 = require("./buttons/build-keyboard");
const back_and_main_1 = require("./buttons/back-and-main");
class MenuButtons {
    constructor() {
        this.buttons = [];
    }
    async generateKeyboardMarkup(ctx, actionCodePrefix, options) {
        const resultButtons = [
            ...this.buttons,
            back_and_main_1.generateBackButtons(actionCodePrefix, options)
        ];
        options.log('create keyboard with buttons', resultButtons);
        return build_keyboard_1.buildKeyboard(resultButtons, actionCodePrefix, ctx);
    }
    add(button, ownRow = true) {
        const lastEntry = this.buttons.slice(-1)[0];
        if (ownRow || !lastEntry || typeof lastEntry === 'function') {
            this.buttons.push([]);
        }
        const lastRow = this.buttons[this.buttons.length - 1];
        lastRow.push(button);
    }
    addCreator(creator) {
        this.buttons.push(creator);
    }
}
exports.default = MenuButtons;
//# sourceMappingURL=menu-buttons.js.map