/**
 * Created by Machinatron on 2017-06-20.
 */
import React from 'react';
import { connect } from 'react-redux';
import Product from './Product.js';
import { CSSTransitionGroup } from 'react-transition-group';
import './InputField/example.css'
import update from 'immutability-helper'

const mapStateToProps = (state) => {
    return {
        products: state.business.products
    }
};

const mapDispatchToProps = dispatch => ({
    deleteProduct: (index, products) => {
        var products1 = update(products, {$splice: [[index, 1]]})
        console.log('delete product');
        console.log(products1);
        dispatch({type: 'DELETE_THE_PRODUCT_ALREADY', visibleDemo: -1, products: products1})
    }

});

class ProductList extends React.Component {

    constructor() {
        super();

    }


    componentWillReceiveProps(nextProps) {
        console.log('ComponentWillReceiveProps')
        console.log(nextProps)
    }


    render() {
        const renderThis = () => {
            if(!this.props.products) {
                return null
            } else {
                return(
                    this.props.products.map((product, idx) => (
                        <div className="bubble" key={idx}>
                            <Product product ={product} index={idx}></Product>
                            &nbsp;
                            &nbsp;
                        </div>

                    ))
                )
            }
        }

        return (
            <div className="documents-list">
                <CSSTransitionGroup
                    transitionName="documents-list"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    {renderThis()}

                </CSSTransitionGroup>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);