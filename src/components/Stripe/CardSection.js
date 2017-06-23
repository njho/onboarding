import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
    render() {
        return (
            <div>
            <label>
                <CardElement style={{base: {fontSize: '18px'}, paddingRight: '10px'}} />
            </label>
                </div>
        );
    }
};

export default CardSection;