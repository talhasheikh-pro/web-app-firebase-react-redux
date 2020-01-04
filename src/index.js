import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import stores from './store';
import './theme/index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
const { store, persistedStore } = stores;

// Intro component
function App() {
    return <Navigation />;
}

// ReactDOM.render function to render the app itself
render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
