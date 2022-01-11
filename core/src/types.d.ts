import { Actions } from './model/action';
import { AnyContextNode } from './model/context/types';
import { Operation } from './model/operation';
export declare type DynamicExpression<T> = AnyContextNode<T> | Operation<T>;
export declare type Expression<T> = T | DynamicExpression<T>;
export declare type ToExpressions<T> = {
    [K in keyof T]: T[K] extends (DynamicExpression<T[K]> | Actions) ? T[K] : Expression<T[K]>;
};
export declare type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch';
