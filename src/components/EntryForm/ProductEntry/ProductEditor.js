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
import update from 'immutability-helper';
import Label from '../../Label/Label'


const mapStateToProps = (state) => {
    return {
        visibleDemo: state.demo.visibleDemo,
        products: state.business.products,
        demoProduct: state.demo.demoProduct,
        editorIndex: state.demo.editorIndex
    }
};

const demoProduct = {
    giftName: "",
    giftPhrase: "",
    giftPrice: ""
}

const mapDispatchToProps = dispatch => ({
    onFocus: (index, product) => {
        dispatch({
            type: 'PRODUCT_DEMO_FOCUS',
            visibleDemo: 'demo',
            editor: true,
            editorIndex: index,
            demoProduct: product
        })
    },
    changeHandler: (demoProduct) => {
        dispatch({type: 'DEMO_HANDLER', demoProduct: demoProduct})
    },
    updateProduct: (newProducts) =>
        dispatch({
            type: 'UPDATE_PRODUCT',
            newProducts: newProducts,
            editor: false,
            visibleDemo: -1,
            demoProduct: {
                giftName: "",
                giftPhrase: "",
                giftPrice: ""
            }
        })

})

const test = {
    cursor: 'pointer'

}



class ProductEditor extends React.Component {



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
            contentMinHeight: 100,
            visible: false
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
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
    componentWillUnmount() {
        clearTimeout(this.updateProduct)
    }

    render() {


        const focusHandler = () => {
            this.props.onFocus(this.props.editorIndex, this.props.demoProduct);
        }

        const changeHandler = (event, field) => {
            event.preventDefault();
            var demoProduct = Object.assign({}, this.props.demoProduct);
            demoProduct[field] = event.target.value;
            this.props.changeHandler(demoProduct);
        }
        var visible = false;

        const updateProduct = () => {
            this.setState({
                ...this.state,
                visible: !this.state.visible,
                emojiView: false,
                formVisible: true
            })

            setTimeout(
                function () {

                    var newObj = update(this.props.products, {$splice: [[[this.props.editorIndex], 1, this.props.demoProduct]]});
                    this.props.updateProduct(newObj);
                }.bind(this)
                , 1000)

        }




        return (

            <div>
                <div className="signup_form">
                    <div className="grid">
                        <div className="cell" onFocus={()=>focusHandler()}>
                            <div className="field">
                                <label htmlFor="product">Gift </label>
                                <input type="text" name="product[Gift]" id="Gift"
                                       placeholder='Meet Superman!'
                                       value={this.props.visibleDemo === -1 || this.props.visibleDemo === 'demo' ? this.props.demoProduct.giftName : this.props.products[this.props.visibleDemo].giftName}
                                       onChange={(e) => changeHandler(e, 'giftName')}/>
                                <label htmlFor="product">What's the best way to describe this?</label>
                                <div ref="current">
                                    <InputContent ref="content" minHeight={ this.state.contentMinHeight }>
                                        <InputField
                                            ref="form"
                                            name="product[Phrase]"
                                            value={this.props.visibleDemo === -1 || this.props.visibleDemo === 'demo' ? this.props.demoProduct.giftPhrase : this.props.products[this.props.visibleDemo].giftPhrase}
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
                                           value={this.props.visibleDemo === -1 || this.props.visibleDemo === 'demo' ? this.props.demoProduct.giftPrice : this.props.demoProduct.giftPrice}
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
<div onClick={() => updateProduct()}>
    {this.state.visible ? null :     <span style={test} >
<IoAndroidAdd /> Save
    </span>}
    </div>

                                <Label visible={this.state.visible}></Label>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditor);