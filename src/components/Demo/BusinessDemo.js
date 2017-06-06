import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        companyName: state.business.companyName,
        products: state.business.products
    }
};

const mapDispatchToProps = dispatch => ({

})

class BusinessDemo extends React.Component {
    render() {

        let companyName = () => {
            if (this.props.companyName === '') {

                return (
                    'The Daily Planet '
                )
            } else {
                return this.props.companyName;

            }
        }

        const productMap = () => {
            return this.props.products.map((product) => {
                    if (product.giftName === '') {
                        return (
                            <div></div>
                        )

                    }
                    else {
                        console.log(product.giftName)
                        return (
                            <div> '{product.giftName}' </div>
                        );
                    }
                }
            )
        }


        return (
            <div>
                <li className="bubble_container">
                    <div className="bubble">
                        <div className="message">{companyName()}</div>
                    </div>
                </li>
                <li className="bubble_container is_bot_bubble_container">
                    <div className="bubble is_bot_bubble">
                        <div className="message is_bot_message">

                            Let's find you something that you'll love at {companyName()}!
                            <br/>
                            <br/>Reply with any of the phrases below to find out more: <br/><br/>
                            {productMap()}

                        </div>
                    </div>
                </li>
            </div>

        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BusinessDemo);