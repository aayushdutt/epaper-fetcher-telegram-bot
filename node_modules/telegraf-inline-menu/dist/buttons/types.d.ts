import { ContextFunc, ConstOrContextFunc } from '../generic-types';
declare type StringOrStringFunc = ConstOrContextFunc<string>;
export declare type ButtonRow = ButtonInfo[];
export declare type KeyboardPart = ButtonRow[];
export declare type KeyboardPartCreator = ContextFunc<KeyboardPart>;
export interface ButtonInfo {
    hide?: ((ctx: any) => Promise<boolean> | boolean);
    root?: boolean;
    text: StringOrStringFunc;
    action?: StringOrStringFunc;
    switchToChat?: StringOrStringFunc;
    switchToCurrentChat?: StringOrStringFunc;
    url?: StringOrStringFunc;
}
export {};
