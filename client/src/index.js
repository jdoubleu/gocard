import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import {ConnectedRouter, routerMiddleware, routerReducer} from "react-router-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {Provider} from "react-redux";
import reducers from "./reducers";
import {offline} from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import callAPI from "./middleware/callAPI";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";

const history = createHistory();
const router = routerMiddleware(history);

const middleware = [thunk, router, callAPI];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const render = () => (
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    )
);

const config = {
    ...offlineConfig,
    persistCallback: render
};

const store = createStore(
    combineReducers({
        ...reducers,
        route: routerReducer
    }),
    compose(
        applyMiddleware(...middleware),
        offline(config),
    )
);

registerServiceWorker();
