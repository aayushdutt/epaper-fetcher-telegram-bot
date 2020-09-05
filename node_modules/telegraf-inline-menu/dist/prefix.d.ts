export declare const emojiTrue = "\u2705";
export declare const emojiFalse = "\uD83D\uDEAB";
declare type ConstOrFunc<T> = T | ((...args: any[]) => Promise<T> | T);
export interface PrefixOptions {
    prefixTrue?: string;
    prefixFalse?: string;
    hideTrueEmoji?: boolean;
    hideFalseEmoji?: boolean;
}
export declare function prefixEmoji(text: ConstOrFunc<string>, prefix: ConstOrFunc<string | boolean | undefined>, options?: PrefixOptions, ...args: any[]): Promise<string>;
export declare function prefixText(text: ConstOrFunc<string>, prefix: ConstOrFunc<string | undefined>, ...args: any[]): Promise<string>;
export {};
