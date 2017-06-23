/**
 * Created by Machinatron on 2017-06-01.
 */
import React from 'react';
import { connect } from 'react-redux';
import '../../../css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {IoAndroidRemove, IoAndroidAdd} from 'react-icons/lib/io/';
import InputField from './InputField/InputField';
import InputContent from './InputField/InputContent.js';
import ReactDOM from 'react-dom';
import DeleteButton from '../delete';


const mapStateToProps = (state, ownProps) => {
    return {
        product: ownProps.product,
        visibleDemo: state.demo.visibleDemo,
        index: ownProps.index,
        products: state.business.products
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: (index, product) => {
        dispatch({type: 'PRODUCT_DEMO_FOCUS', visibleDemo: index, editor: true, editorIndex: index, demoProduct: product})
    },
    changeHandler: (newProducts) => {
        dispatch({type: 'PRODUCT_HANDLER', newProducts: newProducts})
    }

})

const test = {
    cursor: 'pointer',
    float: 'left',
    display: 'inline-block !important'

}

class Product extends React.Component {

    constructor() {
        super();
        this.state = {
            emojiView: false,
            formVisible: true
        };
    }

    componentDidMount() {
        this.setState({
            contentMinHeight: 100
        });
    }



    focusHandler = ()=> {
        console.log('focushandler');
        this.props.onFocus(this.props.index, this.props.product);
    }

    render() {

        return (
            <div>
                <div onClick={this.focusHandler}>
                    <div style={test} onClick={()=>this.focusHandler}>
                        {this.props.product.giftName}            ${this.props.product.giftPrice}
                    </div>
                </div>
                <DeleteButton style={{float: 'right'}} index={this.props.index}></DeleteButton>
            </div>
        )


    }
}

/*                            <textarea type="text" rows="3" maxLength="300" name="product[Phrase]" id="Phrase"
 placeholder="Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!"
 onChange={(e) => changeHandler(e, this.props.index, 'giftPhrase')}/>
 */

export default connect(mapStateToProps, mapDispatchToProps)(Product);