import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        products: state.business.products,
        visibleDemo: state.demo.visibleDemo
    }
};

const productName = () => {
    if (this.props.productName === '') {
        return (
            'A Meeting with Superman'
        )
    } else {
        return this.props.productName;
    }
}

class ProductDemo extends React.Component {
    render() {

        return (
            <div>
                <li className="bubble_container">
                    <div className="bubble">
                        <div className="message">{this.props.products[this.props.visibleDemo].giftName}</div>
                    </div>
                </li>
                <li className="bubble_container is_bot_bubble_container">
                    <div className="bubble is_bot_bubble">
                        <div className="message is_bot_message">
                            {this.props.products[this.props.visibleDemo].giftPhrase}
                            &nbsp;
                             (${this.props.products[this.props.visibleDemo].giftPrice})<br/>
                            <br/>Reply with 'Yes' to buy <br/>
                            (or try another phrase!)

                        </div>
                    </div>
                </li>
            </div>

    )
    }
    }

    export default connect(mapStateToProps,()=>({}))(ProductDemo);