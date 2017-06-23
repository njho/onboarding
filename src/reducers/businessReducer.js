const defaultState = {
    products: [],
    companyName: 'The Daily Planet',
    editor: false
};


export default(state = defaultState, action) => {
    switch (action.type) {
        case 'PRODUCT_ADDED':
            console.log('PRODUCT_ADDED')
            return {
                ...state,
                visibleProduct: '2'
            }
        case 'CHANGE_PRODUCT':
            console.log('CHANGE_PRODUCT')
            return {
                ...state,
                visibleProduct: ''
            }
        case 'FORM_HANDLER':
            console.log('FORM_HANDLER')
            return {
                ...state,
                [action.field]: action.targetValue
            }
        case 'PRODUCT_HANDLER':
            console.log('PRODUCT_HANDLER')
            return {
                ...state,
                products: action.newProducts
            }
        case 'ADD_PRODUCT':
            console.log('ADD_PRODUCT')
            console.log(action.newProducts);
            return {
                ...state,
                products: action.newProducts
            }
        case 'DELETE_THE_PRODUCT_ALREADY':
        {   console.log('DELETE_THE_PRODUCT_ALREADY');
            console.log(action.products)
            return {
                products: action.products
            }
        }
        case 'UPDATE_PRODUCT':
            console.log('UPDATE_PRODUCT')
            console.log(action.newProducts)
            return {
                ...state,
                products: action.newProducts
            }

        default:
            return state;
    }
}