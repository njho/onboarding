import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {  getLatLng, geocodeByPlaceId } from 'react-places-autocomplete'
import {connect} from 'react-redux';
import SimpleMapExample from './Take2';
import { TransitionSpring } from 'react-motion';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import {IoAndroidRemove, IoAndroidAdd} from 'react-icons/lib/io/';
import update from 'immutability-helper';

var MaskedInput = require('react-maskedinput');


const mapStateToProps = (state) => {
    return {
        locations: state.business.locations
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: () => {
        dispatch({type: 'BUSINESS_DEMO_FOCUS', visibleDemo: -1})
    },
    saveLocation: (newLocations) => {
        dispatch({type: 'ADD_LOCATION', newLocations: newLocations});
    }

})


class LocationSubmit extends React.Component {
    constructor() {
        super();
        this.state = {
            address: '',
            placeId: null,
            position: {lat: 40.712842, lng: -74.006094},
            open: '0700',
            openPeriod: 'AM',
            wkOpen: '0900',
            wkOpenPeriod: 'AM',
            close: '0900',
            closePeriod: 'PM',
            wkClose: '0600',
            wkClosePeriod: 'PM',
            details: false
        };

        this.saveLocation = () => {
            if(this.state.address ==='' ){
                this.setState({
                    ...this.state,
                    details: true
                });
                return null;
            }
            var newState;
            if(this.props.locations) {
                newState = update(this.props.locations, {$push:[this.state]})
            } else {
                newState = update([], {$push:[this.state]});
            }

            this.setState({
                address: '',
                placeId: null,
                position: {lat: 40.712842, lng: -74.006094},
                open: '0700',
                openPeriod: 'AM',
                wkOpen: '0900',
                wkOpenPeriod: 'AM',
                close: '0900',
                closePeriod: 'PM',
                wkClose: '0600',
                wkClosePeriod: 'PM',
                details: false
            });
            this.props.saveLocation(newState)

        }
        this.onChange = (address) => this.setState({...this.state,address})
    }

    render() {

        const handleChange = (event, field) => {
            event.preventDefault();
            console.log(event.target.value);
            this.setState({
                ...this.state,
                [field]: event.target.value
            });
        }

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
            placeholder: 'Metropolis, N.Y.'
        }

        const focusHandler = () => {
            console.log('work already')
            this.props.onFocus();
        }

        const handleSelect = (address, placeId) => {
            this.setState({...this.state, address, placeId});
            console.log(placeId);
            geocodeByPlaceId(placeId)
                .then(results=>getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    this.setState({
                        placeId: null,
                        position: {lat: lat, lng: lng}
                    });
                    console.log('Successfully got latitude and longitude', {lat, lng})
                })

            // You can do other things with address string or placeId. For example, geocode :)
        }




        return (
            <div>
                <div className="grid">

                    <div className="cell">
                        <SimpleMapExample position={this.state.position}></SimpleMapExample>
                        <div className="field">
                            <PlacesAutocomplete inputProps={inputProps} options={options}
                                                onFocus={()=>focusHandler()} onSelect={handleSelect}
                                                styles={{autocompleteContainer: {zIndex: '100'}}}
                            />
                        </div>
                    </div>

                </div>
                <div className="grid">
                    <div className="cell">
                        <div className="field">
                            <label htmlFor="instagram">Mon-Fri</label>
                            <div className="hidden_input_wrapper2">
                                <div style={{display: 'flex'}}>
                                    <MaskedInput mask="11:11" size="4"
                                                 value={this.state.open}
                                                 onChange={(e)=>handleChange(e,'open')}
                                                 style={{border: 'none !important', marginLeft: '5px'}}/>
                                    <div className="hidden_input_addition no-margin">
                                        <select value={this.state.openPeriod}
                                                className="border-none"
                                                style={{border: 'none !important'}}
                                                onChange={(e)=>handleChange(e,'openPeriod')}>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="hidden_input_addition">
                                    -
                                </div>
                                <div style={{display: 'flex'}}>
                                    <MaskedInput mask="11:11" size="4"
                                                 value={this.state.close}
                                                 onChange={(e)=>handleChange(e,'close')}
                                                 style={{border: 'none !important', marginLeft: '5px'}}/>
                                    <div className="hidden_input_addition no-margin">
                                        <select value={this.state.closePeriod} className="border-none"
                                                style={{border: 'none !important'}}
                                                onChange={(e)=>handleChange(e, 'closePeriod')}>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="float-right">
                        <div className="cell">
                            <div className="field">
                                <label htmlFor="instagram">Sat-Sun</label>
                                <div className="hidden_input_wrapper2">
                                    <div style={{display: 'flex'}}>
                                        <MaskedInput mask="11:11" size="4"
                                                     value={this.state.wkOpen}
                                                     onChange={(e)=>handleChange(e,'wkOpen')}
                                                     style={{border: 'none !important', marginLeft: '5px'}}/>
                                        <div className="hidden_input_addition no-margin">
                                            <select value={this.state.wkOpenPeriod} className="border-none"
                                                    style={{border: 'none !important'}}
                                                    onChange={(e)=>handleChange(e,'wkOpenPeriod')}>
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="hidden_input_addition">
                                        -
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <MaskedInput mask="11:11" size="4"
                                                     value={this.state.wkClose}
                                                     onChange={(e)=>handleChange(e,'wkClose')}
                                                     style={{border: 'none !important', marginLeft: '5px'}}/>
                                        <div className="hidden_input_addition no-margin">
                                            <select value={this.state.wkClosePeriod} className="border-none"
                                                    style={{border: 'none !important'}}
                                                    onChange={(e)=>handleChange(e,'wkClosePeriod')}>
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <label>
                <span onClick={this.saveLocation} style={{cursor: 'pointer'}}>
<IoAndroidAdd /> Add Location
    </span>
                    {this.state.details ? <span className="alert">Please enter all necessary details</span> : null }
                    </label>
            </div>
        )
    }
}

/**/

export default connect(mapStateToProps, mapDispatchToProps)(LocationSubmit)
