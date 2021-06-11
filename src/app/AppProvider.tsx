import React from 'react';
import { Injector } from 'tpendency';

import bindings from 'src/bindings';

import { AppContext, IAppContext } from './AppContext';
import { wrapPromise, delay } from 'src/utils';

async function createApp(): Promise<IAppContext> {
    const injector = new Injector(bindings);

    // Fake initialization time...
    await delay(500);

    return {
        injector,
    };
}

const appResource = wrapPromise(createApp());

const AppProvider = ({ children }: { children: React.ReactNode; }) => {
    const appContext = appResource.read();
    return <AppContext.Provider value={appContext} children={children} />;
};

export default AppProvider;
