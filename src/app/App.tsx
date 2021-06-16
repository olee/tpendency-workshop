import React from 'react';

import * as Tokens from 'src/tokens';

import { useService } from './AppContext';
import CatComponent from './CatComponent';

import './App.css';

function App() {
    const welcomeMessage = useService(Tokens.WelcomeMessageToken);
    return (
        <div className='App'>
            <header className='App-header'>
                <p>
                    {welcomeMessage}
                </p>
                <React.Suspense fallback={
                    <p>Requesting slow loading service...</p>
                }>
                    <SlowLoadingComponent />
                </React.Suspense>
                <CatComponent />
            </header>
        </div>
    );
}

const SlowLoadingComponent = () => {
    const value = useService(Tokens.SlowLoadingToken);
    return (
        <p>{value}</p>
    );
};

export type PromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : any;

export default App;
