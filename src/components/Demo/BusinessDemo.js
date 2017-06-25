import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        companyName: state.business.companyName,
        products: state.business.products,
        visibleDemo: state.demo.visibleDemo
    }
};

const mapDispatchToProps = dispatch => ({

})

class BusinessDemo extends React.Component {

    willReceiveProps(nextProps) {
/*        console.log('this is from BusinessDemo');
        console.log(nextProps);*/
    }

    render() {
        let companyName = () => {
            if(this.props.products.length < 1 && this.props.companyName==='') {
                return (
                    'The Daily Planet '
                )
            } else {
                if (this.props.visibleDemo === -1 && this.props.companyName==='') {
                    return (
                        'The Daily Planet '
                    )
                } else {
                    return this.props.companyName;
                }
            }
        }

        const productMap = () => {

            if(this.props.products.length < 1) {
                return(
                    <div >'A Meeting with Superman!'</div>
                )
            } else {
                return this.props.products.map((product, idx) => {
                        console.log('this is the typeof');
                        console.log(typeof(product.giftName))

                        if (product.giftName === '' || typeof(product.giftName) === 'undefined') {
                            return (
                                <div key={idx}>'A Meeting with Superman!'</div>
                            )
                        }
                        else {
                            return (
                                <div key={idx}>'{product.giftName}' </div>
                            );
                        }
                    }
                )
            }
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
/*
*                             {productMap()}{companyName()}{companyName()}
 */
export default connect(mapStateToProps,mapDispatchToProps)(BusinessDemo);