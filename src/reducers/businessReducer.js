const defaultState = {
    products: [{
        giftName: 'Meet the Man Steel!',
        giftPhrase: "Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!",
        giftPrice: "5.00"
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
            let newProducts = state.products.slice();
            newProducts[action.index][action.field]=action.targetValue;
            return {
                ...state,
                products: newProducts
            }
        case 'ADD_PRODUCT':
            let addProduct = state.products.slice();
            addProduct.push({
                giftName: 'Meet the Man Steel!',
                giftPhrase: "Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!",
                giftPrice: "5.00"
            });
            return {
                ...state,
                products: addProduct
            }

    }
    return state;
}