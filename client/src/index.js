import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import {ConnectedRouter, routerMiddleware, routerReducer} from "react-router-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";


const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        ...reducers,
        route: routerReducer
    }),
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
