import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import stores from './store';
import './theme/index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const { store, persistedStore } = stores;

// Intro component
function App() {
    return <Navigation />;
}

// ReactDOM.render function to render the app itself
render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
