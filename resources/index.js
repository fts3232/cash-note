import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import routes from './routes';
import reducers from './reducers'
import React from "react";

let store = createStore(reducers);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            { renderRoutes(routes) }
        </BrowserRouter>
    </Provider>, document.querySelector("#app"));
