/**
 * Created by Machinatron on 2017-06-01.
 */

import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
    return {
        product: state.business.products[ownProps.index],
        visibleDemo: state.demo.visibleDemo,
        index: ownProps.index
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: (index) => {
        console.log(index);
        dispatch({type: 'PRODUCT_DEMO_FOCUS', visibleDemo: index})
    },
    changeHandler: (event, index, field) => {

        dispatch({type: 'PRODUCT_HANDLER', index: index, field: field, targetValue: event.target.value})
    }

})

class ProductEntry extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const focusHandler = (index) =>{
            this.props.onFocus(index);
        }


        return (

                <div className="grid">
                    <div className="cell" onFocus={()=>focusHandler(this.props.index)}>
                        <div className="field">
                            <label htmlFor="product">Gift</label>
                            <input type="text" name="product[Gift]" id="Gift"
                                   placeholder="Meet the Man Steel!"
                                   onChange={(e) => this.props.changeHandler(e, this.props.index, 'giftName')}/>
                            <label htmlFor="product">What's the best way to describe this?</label>
                            <input type="text" name="product[Phrase]" id="Phrase"
                                   placeholder="Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!"
                                   onChange={(e) => this.props.changeHandler(e, this.props.index, 'giftPhrase')}/>
                            <label htmlFor="product">What should the end user pay for this?</label>
                            <div className="hidden_input_wrapper">
                                <div className="hidden_input_addition">$</div>
                                <input type="text" name="product[Price]" id="Price"
                                       placeholder="5.00"
                                       onChange={(e) => this.props.changeHandler(e, this.props.index, 'giftPrice')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductEntry);