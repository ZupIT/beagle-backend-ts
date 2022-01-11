import { AnyRootContext } from './context/types';
export interface ComponentInterface {
    id?: string;
    children?: Component[];
    context?: AnyRootContext<any>;
    properties?: Record<string, any>;
    name: string;
    namespace?: string;
}
export declare class Component implements ComponentInterface {
    constructor({ properties, children, context, id, name, namespace }: ComponentInterface);
    namespace: string;
    id: string | undefined;
    name: string;
    children: Component[] | undefined;
    context: {
        readonly path: string;
        toString: () => string;
        set: (value: any, analytics?: import("./action").AnalyticsConfig<any> | undefined) => import("./action").ActionInterface<any>;
        readonly value?: any;
    } | ({
        readonly path: string;
        toString: () => string;
        set: (value: any, analytics?: import("./action").AnalyticsConfig<any> | undefined) => import("./action").ActionInterface<any>;
        readonly value?: any;
    } & {
        at: <I extends number>(index: I) => import("./context/types").PrimitiveContextNode<any> | import("./context/types").ArrayContextNode<any> | import("./context/types").MapContextNode<any>;
    }) | ({
        readonly path: string;
        toString: () => string;
        set: (value: any, analytics?: import("./action").AnalyticsConfig<any> | undefined) => import("./action").ActionInterface<any>;
        readonly value?: any;
    } & {
        get: <K extends string | number | symbol>(key: K) => import("./context/types").PrimitiveContextNode<any> | import("./context/types").ArrayContextNode<any> | import("./context/types").MapContextNode<any>;
    }) | undefined;
    properties: Record<string, any> | undefined;
}
