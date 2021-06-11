
export interface IToken<T> {
    readonly debugName: string;
    readonly surrogate?: T;
    readonly toString: () => string;
}

export declare type TupleToTokens<T extends readonly any[]> = {
    [i in keyof T]: IToken<T[i]>;
};

export interface IProvider<T, TDeps extends readonly any[] = readonly any[]> {
    dependencyTokens: TupleToTokens<TDeps>;
    get(dependencies: TDeps): Promise<T>;
}

export interface IBinding<T = unknown> {
    token: IToken<T>;
    provider: IProvider<T>;
}

export interface ClassType<TInstance = any, TParams extends readonly any[] = readonly any[]> {
    new(...args: TParams): TInstance;
}
