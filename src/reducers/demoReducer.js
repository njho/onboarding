const defaultState = {
    visibleDemo: -1,
    demoProduct: {
        giftName: "",
        giftPhrase: "",
        giftPrice: ""
    },
    editor: false
};

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'PRODUCT_DEMO_FOCUS':
        { console.log('PRODUCT_DEMO_FOCUS')
            console.log(action.editorIndex);
            return {
                ...state,
                visibleDemo: action.visibleDemo,
                editor: action.editor,
                editorIndex: action.editorIndex,
                demoProduct: action.demoProduct
            }
        }
        case 'BUSINESS_DEMO_FOCUS':
            console.log('BUSINESS_DEMO_FOCUS')
            return {
                ...state,
                visibleDemo: -1
            }
        case 'DELETE_THE_PRODUCT_ALREADY':
            console.log('DELETE_THE_PRODUCT_ALREADY')
            return {
                visibleDemo: -1,
                demoProduct: {
                    giftName: "",
                    giftPhrase: "",
                    giftPrice: ""
                }
            }
        case 'DEMO_HANDLER':
            console.log('DEMO_HANDLER')
            return {
                ...state,
                demoProduct: action.demoProduct
            }
        case 'ADD_PRODUCT':
            console.log('ADD_PRODUCT')
            return {
                ...state,
                editor: action.editor,
                demoProduct: action.demoProduct,
                visibleDemo: -1
            }
        case 'UPDATE_PRODUCT':
            console.log('ADD_PRODUCT')
            return {
                ...state,
                editor: action.editor,
                demoProduct: action.demoProduct
            }
        default:
            return state;
    }
}