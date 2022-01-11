import { Expression } from '../../types';
import { AnalyticsConfig, ActionInterface } from '../action';
export declare class ContextNode<T> {
    readonly path: string;
    constructor(path: string);
    toString(): string;
    set(value: Expression<T>, analytics?: AnalyticsConfig<T>): ActionInterface;
    at(index: number): ContextNode<any>;
    get(key: string): ContextNode<any>;
}
