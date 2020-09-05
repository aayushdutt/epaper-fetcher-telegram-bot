export default class ActionCode {
    readonly code: string | RegExp;
    constructor(actionCode: string | RegExp);
    get(): string | RegExp;
    getRegex(): RegExp;
    getString(): string;
    exec(value: string): RegExpExecArray | null;
    test(value: string): boolean;
    testIsBelow(value: string): boolean;
    isDynamic(): boolean;
    concat(action: string | RegExp | ActionCode): ActionCode;
    parent(): ActionCode;
}
