import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        products: state.business.products,
        visibleDemo: state.demo.visibleDemo,
        demoProduct: state.demo.demoProduct
    }
};


class ProductDemo extends React.Component {


    render() {
        const productName = () => {
            if (this.props.products[this.props.visibleDemo].giftName === '') {
                return (
                    'A Meeting with Superman!'
                )
            } else {
                return this.props.products[this.props.visibleDemo].giftName;
            }
        }

        if(this.props.visibleDemo === 'demo') {
            return (
                <div>
                    <li className="bubble_container">
                        <div className="bubble">
                            <div className="message">{this.props.demoProduct.giftName !== '' ? this.props.demoProduct.giftName : 'Meet Superman!'}</div>
                        </div>
                    </li>
                    <li className="bubble_container is_bot_bubble_container">
                        <div className="bubble is_bot_bubble">
                            <div className="message is_bot_message">
                                {this.props.demoProduct.giftPhrase !== '' ? this.props.demoProduct.giftPhrase : 'Have you ever wanted to meet the man of steel?   (I know I have!) Give your friend the trip of a lifetime with Superman!'}
                                &nbsp;
                                (${this.props.demoProduct.giftPrice !== '' ? this.props.demoProduct.giftPrice : '5.00'})<br/>
                                <br/>Reply with 'Yes' to buy <br/>
                                (or try another phrase!)

                            </div>
                        </div>
                    </li>
                </div>

            )
        }


        return (
            <div>
                <li className="bubble_container">
                    <div className="bubble">
                        <div className="message">{productName()}</div>
                    </div>
                </li>
                <li className="bubble_container is_bot_bubble_container">
                    <div className="bubble is_bot_bubble">
                        <div className="message is_bot_message">
                            {this.props.products[this.props.visibleDemo].giftPhrase !== '' ? this.props.products[this.props.visibleDemo].giftPhrase : 'Have you ever wanted to meet the man of steel?   (I know I have!) Give your friend the trip of a lifetime with Superman!'}
                            &nbsp;
                            (${this.props.products[this.props.visibleDemo].giftPrice !== '' ? this.props.products[this.props.visibleDemo].giftPrice : '5.00'})<br/>
                            <br/>Reply with 'Yes' to buy <br/>
                            (or try another phrase!)

                        </div>
                    </div>
                </li>
            </div>

        )
    }
}

export default connect(mapStateToProps, ()=>({}))(ProductDemo);