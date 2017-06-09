const defaultState = {
    visibleDemo: -1
};

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'PRODUCT_DEMO_FOCUS':
        {
            return {
                ...state,
                visibleDemo: action.visibleDemo
            }
        }
        case 'BUSINESS_DEMO_FOCUS':
            return {
                ...state,
                visibleDemo: -1
            }
        case 'DELETE_THE_PRODUCT_ALREADY':

            return {
                visibleDemo:  action.visibleDemo
            }
        default:
            return state;
    }
}