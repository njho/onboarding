/**
 * Created by Machinatron on 2017-06-01.
 */
import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state,ownProps) => {
    return {
        product: state.business.products[ownProps.index],
        visibleDemo: state.demo.visibleDemo,
        index: ownProps.index,
        products: state.business.products
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: (index) => {;
        dispatch({type: 'PRODUCT_DEMO_FOCUS', visibleDemo: index})
    },
    changeHandler: (newProducts) => {
        dispatch({type: 'PRODUCT_HANDLER', newProducts: newProducts})
    }

})

class ProductEntry extends React.Component {

    render() {
        const focusHandler = (index) =>{
            this.props.onFocus(index);
        }

        const changeHandler = (event, index, field) => {
            let newProducts = this.props.products.slice();
            newProducts[index][field]= event.target.value;
            this.props.changeHandler(newProducts);
        }


        return (

                <div className="grid">
                    <div className="cell" onFocus={()=>focusHandler(this.props.index)}>

                        <div className="field">
                            <label htmlFor="product">Gift </label>
                            <input type="text" name="product[Gift]" id="Gift"
                                   placeholder='Meet the Man of Steel!'
                                   value={this.props.product.giftName}
                                   onChange={(e) => changeHandler(e, this.props.index, 'giftName')}/>
                            <label htmlFor="product">What's the best way to describe this?</label>
                            <textarea type="text" rows="3" maxLength="300" name="product[Phrase]" id="Phrase"
                                   placeholder="Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!"
                                   onChange={(e) => changeHandler(e, this.props.index, 'giftPhrase')}/>
                            <label htmlFor="product">What should the end user pay for this?</label>
                            <div className="hidden_input_wrapper">
                                <div className="hidden_input_addition">$</div>
                                <input type="number" name="product[Price]" id="Price"
                                       placeholder="5.00"
                                       onChange={(e) => changeHandler(e, this.props.index, 'giftPrice')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductEntry);