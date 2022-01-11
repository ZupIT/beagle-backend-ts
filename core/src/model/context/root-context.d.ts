import { ContextNode } from './context-node';
export declare class RootContext<T> extends ContextNode<T> {
    constructor(id: string, value?: T);
    readonly value?: T;
}
