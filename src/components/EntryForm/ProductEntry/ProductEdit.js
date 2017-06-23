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
        visibleDemo: state.demo.visibleDemo,
        products: state.business.products,
        demoProduct: state.demo.demoProduct
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: (index) => {
        dispatch({type: 'PRODUCT_DEMO_FOCUS', visibleDemo: 'demo'})
    },
    changeHandler: (demoProduct) => {
        dispatch({type: 'DEMO_HANDLER', demoProduct: demoProduct})
    },
    addProduct: (newProducts) =>
        dispatch({type: 'ADD_PRODUCT', newProducts: newProducts})

})

const test = {
    cursor: 'pointer'

}

class ProductEdit extends React.Component {

    constructor() {
        super();
        this.state = {
            emojiView: false,
            formVisible: true
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            contentMinHeight: 100
        });
    }


    _handleFormHeightChange() {
        if (this.state.formVisible) {
            this.setState({
                ...this.state,
                contentMinHeight: this._getRefHeight('form')
            });
        }
    }

    _getRefHeight(ref) {
        return ReactDOM.findDOMNode(this.refs[ref]).offsetHeight;
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
    render() {


        const focusHandler = () => {
            this.props.onFocus('demo');
        }

        const changeHandler = (event, field) => {
            event.preventDefault();
            var demoProduct = Object.assign({}, this.props.demoProduct);
            demoProduct[field] = event.target.value;
            this.props.changeHandler(demoProduct);
        }

        const addProduct = () => {
            var demoProduct = Object.assign({}, this.props.demoProduct);
            const newProducts = this.props.products.concat([demoProduct]);
            this.props.addProduct(newProducts);
            this.setState({
                emojiView: false,
                formVisible: true
            })
        }


        return (

            <div>
                <div className="signup_form">
                    <div className="grid">
                        <div className="cell" onFocus={()=>focusHandler()}>
                            <div className="field">
                                <label htmlFor="product">Gift </label>
                                <input type="text" name="product[Gift]" id="Gift"
                                       placeholder='A meeting with Superman!'
                                       value={this.props.demoProduct.giftName}
                                       onChange={(e) => changeHandler(e, 'giftName')}/>
                                <label htmlFor="product">What's the best way to describe this?</label>
                                <div ref="current">
                                    <InputContent ref="content" minHeight={ this.state.contentMinHeight }>
                                        <InputField
                                            ref="form"
                                            name="product[Phrase]"
                                            value={this.props.demoProduct.giftPhrase}
                                            onChange={(e) => changeHandler(e, 'giftPhrase')}
                                            onHeightChange={ this._handleFormHeightChange.bind(this) }
                                        ></InputField>
                                    </InputContent>
                                </div>

                                <label htmlFor="product">What should the end user pay for this?</label>
                                <div className="hidden_input_wrapper">
                                    <div className="hidden_input_addition">$</div>
                                    <input type="number" step="0.01" name="product[Price]" id="Price"
                                           placeholder="5.00"
                                           onChange={(e) => changeHandler(e, 'giftPrice')}
                                           value={this.props.demoProduct.giftPrice}
                                    />
                                </div>
                                <div>
                                    <label style={{paddingTop: '5px'}}>Pick 5 emoji's that describe for your
                                        gift! &emsp;
                                        {this.state.emojiView ?
                                            <IoAndroidRemove color="63C146" style={test}
                                                             onClick={()=>{this.setState({emojiView: !this.state.emojiView})}}/>
                                            : <IoAndroidAdd color="#63C146" style={test}
                                                            onClick={()=>
                                                          {this.setState({emojiView: !this.state.emojiView})}}/>}
                                    </label>
                                    {this.state.emojiView ?
                                        <Picker color="#63C146" sheetSize="32" exclude={['recent']} title="pick yours"
                                                onClick={this.addEmoji}/> : null}
                                </div>
<span style={test} onClick={() => addProduct()}>
<IoAndroidAdd /> Add
    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*                            <textarea type="text" rows="3" maxLength="300" name="product[Phrase]" id="Phrase"
 placeholder="Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!"
 onChange={(e) => changeHandler(e, this.props.index, 'giftPhrase')}/>
 */

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);