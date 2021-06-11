import React from 'react';
import type { Injector, IToken } from 'tpendency';

export interface IAppContext {
    injector: Injector;
}

export const AppContext = React.createContext<IAppContext | undefined>(undefined);

export function useApp() {
    const ctx = React.useContext(AppContext);
    if (!ctx) {
        throw new Error('useApp not called inside AppContext provider');
    }
    return ctx;
}

export function useService<T>(token: IToken<T>) {
    return useApp().injector.getSuspense(token);
}
