import { IBinding, IToken, IProvider, TupleToTokens, ClassType } from './types';

export function createToken<T>(debugName: string): IToken<T> {
    return {
        debugName,
        toString: () => debugName,
    };
}

export function createBinding<T>(token: IToken<T>, provider: IProvider<T>): IBinding<T> {
    return { token, provider };
}

export default class Injector {

    public bindings = new Map<IToken<any>, IProvider<any>>();

    public cache = new Map<IToken<any>, Promise<any>>();

    constructor(bindings: IBinding[]) {
        this.addBindings(bindings);
    }

    public addBindings(bindings: IBinding[]) {
        for (const binding of bindings) {
            this.addBinding(binding);
        }
    }

    public addBinding(binding: IBinding) {
        this.bindings.set(binding.token, binding.provider);
    }

    public async get<T>(token: IToken<T>): Promise<T> {
        if (this.cache.has(token)) {
            return this.cache.get(token);
        } else {
            const promise = this.provide(token);
            this.cache.set(token, promise);
            return promise;
        }
    }

    private async provide<T>(token: IToken<T>) {
        const provider = this.bindings.get(token);
        if (!provider) {
            throw new Error(`Unbound token ${token}`);
        }

        const dependencies = await Promise.all(
            provider.dependencyTokens
                .map(t => this.get(t))
        );

        return await provider.get(dependencies);
    }

}

export class ValueProvider<T> implements IProvider<T> {
    constructor(
        private readonly value: T
    ) { }

    public readonly dependencyTokens = [];

    public async get() {
        return this.value;
    }
}

export class ClassProvider<T, TDeps extends readonly any[]> implements IProvider<T, TDeps> {
    constructor(
        private readonly _class: ClassType<T, TDeps>,
        public readonly dependencyTokens: TupleToTokens<TDeps>
    ) {}

    public async get(dependencies: TDeps) {
        return new this._class(...dependencies);
    }
}
