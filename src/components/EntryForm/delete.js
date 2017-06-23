import React from 'react';
import { connect } from 'react-redux';
import {IoAndroidAdd, IoIosTrashOutline} from 'react-icons/lib/io/';
import update from 'immutability-helper';

const mapStateToProps = (state, ownProps) => {
    return {
        index: ownProps.index,
        products: state.business.products
    }
};

const mapDispatchToProps = dispatch => ({
    deleteProduct: (products) =>{
        dispatch({type: 'DELETE_THE_PRODUCT_ALREADY', visibleDemo: -1, products: products})
    }

});

const test = {
    position: 'relative',
    float: 'right',
    cursor: 'pointer'
}


class DeleteButton extends React.Component {

    componentWillReceiveProps(nextProps) {

    }

    deleteProduct(index) {
        var products1 = update(this.props.products, {$splice: [[index, 1]]})
        this.props.deleteProduct(products1)
    }


    render() {
            return (
                <div style={test}
                      onClick={() => {this.deleteProduct(this.props.index)}}>
                    <IoIosTrashOutline />
                </div>
            );


    }


}
;

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);