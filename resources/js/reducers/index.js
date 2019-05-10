import { combineReducers } from 'redux'
const todos = (state = {'footerHidden':false}, action) => {
    switch (action.type) {
        case 'TOGGLE_FOOTER':
            return  {'footerHidden':!state.footerHidden}

        default:
            return state
    }
}

export default combineReducers({todos})