import ReactDOM from "react-dom";
import App from "./components/layout/app.jsx";
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './reducers'
const store = createStore(rootReducer);

//需要渲染什么数据
function mapStateToProps(state) {
    return {'footerHidden':state}
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: () => dispatch({ type: 'TOGGLE_FOOTER' }),
        PayDecrease: () => dispatch({ footerHidden: 'TOGGLE_FOOTER' })
    }
}
let MyApp = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <MyApp />
    </Provider>, document.querySelector("#app"));
