const defaultState = {
    visibleDemo: -1,
    demoProduct: {
        giftName: "",
        giftPhrase: "",
        giftPrice: ""
    },
    editor: false,
    locationEditor: false
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'PRODUCT_DEMO_FOCUS':
        {
            console.log('PRODUCT_DEMO_FOCUS')
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
                ...state,
                visibleDemo: -1,
                demoProduct: {
                    giftName: "",
                    giftPhrase: "",
                    giftPrice: ""
                },
                editor: false
            }
        case 'DEMO_HANDLER':
            console.log('DEMO_HANDLER')
            return {
                ...state,
                demoProduct: action.demoProduct
            }
        case 'LOCATION_HANDLER':
            console.log('LOCATION_HANDLER')
            return {
                ...state,
                locationParams: action.locationParams
            }
        case 'ADD_PRODUCT':
            console.log('ADD_PRODUCT')
            return {
                ...state,
                editor: action.editor,
                demoProduct: action.demoProduct,
                visibleDemo: -1,
                reRender: false
            }
        case 'UPDATE_PRODUCT':
            console.log('ADD_PRODUCT')
            return {
                ...state,
                editor: false,
                demoProduct: action.demoProduct,
                visibleDemo: -1,
                reRender: true,
                locationParams: null
            }
        case 'UPDATE_LOCATION':
            console.log('UPDATE_LOCATION');
            return {
                ...state,
                locationEditor: false,
                defaultParams: action.defaultParams
            }
        case 'LOCATION_DEMO_FOCUS':
        {
            console.log('PRODUCT_DEMO_FOCUS')
            return {
                ...state,
                locationDemo: true,
                locationEditor: true,
                locationIndex: action.locationIndex,
                locationParams: action.locationParams

            }
        }

        default:
            return state;
    }
}