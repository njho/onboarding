import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {  getLatLng, geocodeByPlaceId } from 'react-places-autocomplete'
import {connect} from 'react-redux';
import SimpleMapExample from './Take2';
import { TransitionSpring } from 'react-motion';

const mapStateToProps = (state) => {
    return {}
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
            address: 'Metropolis, N.Y.',
            placeId: null,
            position: { lat: 40.712842, lng: -74.006094}
        };
        this.onChange = (address) => this.setState({address})
    }


    render() {

        const input = {
            paddingRight: '20px !important'
        }

        /* Options for the Address Autocomplete */

        const options = {
            types: ['address'],
            componentRestrictions: {country: ["us", "ca"]}
        }
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }

        const focusHandler = () => {
            console.log('work already')
            this.props.onFocus();
        }

        const handleSelect = (address, placeId) => {
            this.setState({address, placeId});
            console.log(placeId);
            geocodeByPlaceId(placeId)
                .then(results=>getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    this.setState({
                        placeId: null,
                        position: { lat: lat, lng: lng }
                    });
                    console.log('Successfully got latitude and longitude', {lat, lng})})

            // You can do other things with address string or placeId. For example, geocode :)
        }




        return (
            <div className="grid">
                <div className="cell">
                    <div className="field">
                        <PlacesAutocomplete inputProps={inputProps} options={options}
                                            onFocus={()=>focusHandler()} onSelect={handleSelect}
                                            styles={{autocompleteContainer: {zIndex: '100'}}}
                                                />
                    </div>
                    <SimpleMapExample position={this.state.position}></SimpleMapExample>

                </div>
                <div className="cell">
                    <div className="field">

                    </div>
                </div>
            </div>
        )
    }
}

/**/

export default connect(mapStateToProps, mapDispatchToProps)(LocationEntry)
