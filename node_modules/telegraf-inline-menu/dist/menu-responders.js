"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const middleware_helper_1 = require("./middleware-helper");
const combined_middleware_1 = require("./combined-middleware");
class MenuResponders {
    constructor() {
        this.responders = [];
    }
    add(responder) {
        this.responders.push(responder);
    }
    hasSomeNonActionResponders() {
        return this.responders.some(o => o.action === undefined);
    }
    createMiddleware(environment) {
        const { actionCode, setMenuFunc } = environment;
        const menuMiddleware = telegraf_1.Composer.action(actionCode.get(), async (ctx) => setMenuFunc(ctx, 'menu action'));
        return telegraf_1.Composer.compose([
            menuMiddleware,
            ...this.responders
                .map(o => createMiddlewareFromResponder(o, environment))
        ]);
    }
}
exports.default = MenuResponders;
function createMiddlewareFromResponder(responder, environment) {
    const m = new combined_middleware_1.default(responder.middleware);
    if (responder.only) {
        m.addOnly(responder.only);
    }
    if (responder.hide) {
        m.addHide(responder.hide);
    }
    const { actionCode, setMenuFunc, setParentMenuFunc } = environment;
    if (responder.setParentMenuAfter) {
        if (!setParentMenuFunc) {
            throw new Error(`There is no parent menu for this that could be set. Remove the 'setParentMenuAfter' flag. Occured in menu ${actionCode.get()}`);
        }
        m.addAfterFunc(async (ctx) => setParentMenuFunc(ctx, `setParentMenuAfter ${actionCode.get()}`), Boolean(responder.action));
    }
    else if (responder.setMenuAfter) {
        m.addAfterFunc(async (ctx) => setMenuFunc(ctx, `setMenuAfter ${actionCode.get()}`), Boolean(responder.action));
    }
    if (!responder.action) {
        return m.middleware();
    }
    const childActionCode = actionCode.concat(responder.action);
    m.addOnly(middleware_helper_1.isCallbackQueryActionFunc(childActionCode));
    return m.middleware();
}
exports.createMiddlewareFromResponder = createMiddlewareFromResponder;
//# sourceMappingURL=menu-responders.js.map