import React from 'react';
import BusinessDemo from './BusinessDemo.js';
import ProductDemo from './ProductDemo.js';
import demoReducer from '../../reducers/demoReducer.js';
import { connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        visibleDemo: state.demo.visibleDemo,
        companyName: state.business.companyName
    }
};

const mapDispatchToProps = dispatch => ({
    oncClickLogout: () => dispatch({
        type: 'LOGOUT'
    }),
    onSubmitForm: user => dispatch({
        type: 'SETTINGS_SAVED'
    })
})


class Demo extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    };

    render() {

        const displayDemo = () => {

            if (this.props.visibleDemo === -1) {
                return (<BusinessDemo></BusinessDemo>)
            }
            else {
                return (<ProductDemo></ProductDemo>)
            }

        }



        return (
            <section id="banner">
                <div className="header"><a href="/">Gifty | </a> {this.props.companyName === 'The Daily Planet' ? null :  this.props.companyName}</div>
                <div className="content">
                    <div className="signup_container">
                        <ul className="signup">
                            <li>
                            </li>
                        </ul>
                        <ul className="bubbles">

                            {displayDemo()}


                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);


/*        const companyName = () => {
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
 if (product.name === '') {
 console.log('hit');
 return (
 <div></div>
 )

 }
 else {
 console.log(product.name)
 return (
 <div> '{product.name}' </div>
 );
 }
 }
 )
 }

 */