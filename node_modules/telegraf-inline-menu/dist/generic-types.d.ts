import { ContextMessageUpdate } from 'telegraf';
declare type ConstOrPromise<T> = T | Promise<T>;
export declare type ConstOrContextFunc<ReturnType> = ReturnType | ContextFunc<ReturnType>;
export declare type ContextFunc<ReturnType> = (ctx: ContextMessageUpdate) => ConstOrPromise<ReturnType>;
export declare type ContextNextFunc = (ctx: ContextMessageUpdate, next: any) => Promise<void>;
export declare type ContextKeyFunc<ReturnType> = (ctx: ContextMessageUpdate, key: string) => ConstOrPromise<ReturnType>;
export declare type ContextKeyIndexArrFunc<ReturnType> = (ctx: ContextMessageUpdate, key: string, index: number, array: readonly string[]) => ConstOrPromise<ReturnType>;
export {};
