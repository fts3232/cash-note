import { combineReducers } from 'redux';
import footer from './footer.js';
import header from './header.js';

// const store = createStore(combineReducers({footer}));

// export default store
export default combineReducers({ footer, header });