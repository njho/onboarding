import React from 'react';
import LocationSubmit from './LocationSubmit';
import LocationEditor from './LocationEditor'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        locationEditor: state.demo.locationEditor
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: () => {
        dispatch({type: 'BUSINESS_DEMO_FOCUS', visibleDemo: -1})
    },
    changeHandler: (event, field) => {
        dispatch({type: 'FORM_HANDLER', field: field, targetValue: event.target.value})
    },
    addProduct: (e) => {
        e.preventDefault();
        dispatch({type: 'ADD_PRODUCT'});
    }

})

class LocationEntry extends React.Component {
    constructor() {
        super();
        this.state = {
            address: '',
            placeId: null,
            position: {lat: 40.712842, lng: -74.006094}
        };
        this.onChange = (address) => this.setState({address})
    }


    render() {

        var renderWhat = () => {
            if (this.props.locationEditor === false) {
                return (
                    <LocationSubmit></LocationSubmit>
                )
            } else {
                return (
                    <LocationEditor></LocationEditor>
                )
            }
        }

        return (
            <div>
                {renderWhat()}
            </div>
        )
    }
}

/**/

export default connect(mapStateToProps, mapDispatchToProps)(LocationEntry)
