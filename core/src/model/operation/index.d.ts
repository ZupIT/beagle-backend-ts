import { ValidOperationAttribute } from './types';
export declare class Operation<ReturnType = void> {
    constructor(name: string, args: ValidOperationAttribute[]);
    readonly name: string;
    readonly args: ValidOperationAttribute[];
    asString(includeDelimiters: boolean): string;
    toString(): string;
}
