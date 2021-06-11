import React from 'react';

const AppProvider = React.lazy(() => import('./AppProvider'));
const App = React.lazy(() => import('./App'));

function AppLoader() {
    return (
        <React.Suspense fallback={
            <h1 className='load-splash'>
                Loading Application...
            </h1>
        }>
            <AppProvider>
                <App />
            </AppProvider>
        </React.Suspense>
    );
}

export default AppLoader;
