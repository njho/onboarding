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
    addProduct: (index) =>
        dispatch({type: 'ADD_PRODUCT'}),
    deleteProduct: (index, products) =>{
        var products1 = update(products, {$splice: [[index, 1]]})
        console.log(products1);
        console.log(index);

        dispatch({type: 'DELETE_THE_PRODUCT_ALREADY', visibleDemo: index-1, products: products1})
    }

});

const test = {
    float: 'right',
    position: 'relative',
    cursor: 'pointer'
}


class DeleteButton extends React.Component {

    render() {
        if (this.props.index < this.props.products.length-1 && this.props.products.length !==1 ) {
            return (
                <span style={test}
                      onClick={(index)=>this.props.deleteProduct(this.props.index, this.props.products)}>
            <IoIosTrashOutline />
                </span>
            );
        }
        return (

            <span style={test} onClick={()=>this.props.addProduct(this.props.index)}>
<IoAndroidAdd />
                Add
    </span>
        )


    }


}
;

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);