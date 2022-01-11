import { ToExpressions } from '../types';
export declare type AnalyticsConfig<Props> = false | {
    additionalEntries?: Record<string, any>;
    attributes: (keyof Props)[];
};
export interface Analytics<Props = any> {
    analytics?: AnalyticsConfig<Props>;
}
export interface ActionInterface<Props = any> {
    namespace?: string;
    name: string;
    properties?: ToExpressions<Props>;
    analytics?: AnalyticsConfig<Props>;
}
export declare type ActionProps<Props> = ToExpressions<Props> & Analytics<Props>;
export declare type ActionFunction<Props> = (props: ActionProps<Props>) => ActionInterface;
export declare type Actions = ActionInterface | ActionInterface[];
export declare class Action<Props = any> implements ActionInterface<Props> {
    constructor({ name, analytics, namespace, properties }: ActionInterface<Props>);
    namespace: string;
    name: string;
    properties: ToExpressions<Props> | undefined;
    analytics: AnalyticsConfig<Props> | undefined;
}
export declare const createAction: <Props = any>(name: string, namespace?: string | undefined) => ActionFunction<Props>;
