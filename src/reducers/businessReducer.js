const defaultState = {
    products: [{
        giftName: "",
        giftPhrase: "",
        giftPrice: ""
    }],
    companyName: 'The Daily Planet'
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'PRODUCT_ADDED':
            return {
                ...state,
                visibleProduct: '2'
            }
        case 'CHANGE_PRODUCT':
            return {
                ...state,
                visibleProduct: ''
            }
        case 'FORM_HANDLER':
            return {
                ...state,
                [action.field]: action.targetValue
            }
        case 'PRODUCT_HANDLER':
            return {
                ...state,
                products: action.newProducts
            }
        case 'ADD_PRODUCT':
            let addProduct = state.products.slice();
            addProduct.push({
                giftName: '',
                giftPhrase: "",
                giftPrice: ""
            });
            return {
                ...state,
                products: addProduct
            }
        case 'DELETE_THE_PRODUCT_ALREADY':
            return {
                ...state,
                products: action.products
            }
        default:
            return state;
    }
}