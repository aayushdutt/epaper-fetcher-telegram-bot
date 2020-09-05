"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiTrue = '✅';
exports.emojiFalse = '🚫';
async function prefixEmoji(text, prefix, options = {}, ...args) {
    if (!options.prefixTrue) {
        options.prefixTrue = exports.emojiTrue;
    }
    if (!options.prefixFalse) {
        options.prefixFalse = exports.emojiFalse;
    }
    const prefixResult = typeof prefix === 'function' ? await prefix(...args) : prefix;
    const prefixContent = applyOptionsToPrefix(prefixResult, options);
    return prefixText(text, prefixContent, ...args);
}
exports.prefixEmoji = prefixEmoji;
function applyOptionsToPrefix(prefix, options) {
    const { prefixFalse, prefixTrue, hideFalseEmoji, hideTrueEmoji } = options;
    if (prefix === true) {
        if (hideTrueEmoji) {
            return undefined;
        }
        return prefixTrue;
    }
    if (prefix === false) {
        if (hideFalseEmoji) {
            return undefined;
        }
        return prefixFalse;
    }
    return prefix;
}
async function prefixText(text, prefix, ...args) {
    const textResult = typeof text === 'function' ? await text(...args) : text;
    const prefixResult = typeof prefix === 'function' ? await prefix(...args) : prefix;
    if (!prefixResult) {
        return textResult;
    }
    return `${prefixResult} ${textResult}`;
}
exports.prefixText = prefixText;
//# sourceMappingURL=prefix.js.map