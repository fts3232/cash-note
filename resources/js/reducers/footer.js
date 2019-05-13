export default (state = {'hidden': false}, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return {'hidden': !state.hidden};
        default:
            return state
    }
}