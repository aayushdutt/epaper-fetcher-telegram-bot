import ActionCode from './action-code';
export default class DuplicateActionGuardian {
    private readonly _static;
    private readonly _dynamic;
    addStatic(action: string): ActionCode;
    addDynamic(action: string): ActionCode;
}
