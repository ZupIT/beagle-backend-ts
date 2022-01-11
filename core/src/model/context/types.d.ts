import { RootContext } from './root-context';
import { ContextNode } from './context-node';
declare type Primitive = string | boolean | number;
export declare type PrimitiveContextNode<T> = Omit<ContextNode<T>, 'get' | 'at'>;
export declare type MapContextNode<T> = PrimitiveContextNode<T> & {
    get<K extends keyof T>(key: K): AnyContextNode<T[K]>;
};
export declare type ArrayContextNode<T> = PrimitiveContextNode<T> & {
    at<I extends number>(index: I): T extends any[] ? AnyContextNode<T[I]> : never;
};
export declare type AnyContextNode<T> = T extends Primitive ? PrimitiveContextNode<T> : (T extends any[] ? ArrayContextNode<T> : MapContextNode<T>);
declare type PrimitiveRootContext<T> = Omit<RootContext<T>, 'get' | 'at'>;
declare type MapRootContext<T> = PrimitiveRootContext<T> & {
    get: MapContextNode<T>['get'];
};
declare type ArrayRootContext<T> = PrimitiveRootContext<T> & {
    at: ArrayContextNode<T>['at'];
};
export declare type AnyRootContext<T> = T extends Primitive ? PrimitiveRootContext<T> : (T extends any[] ? ArrayRootContext<T> : MapRootContext<T>);
export {};
