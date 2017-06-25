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
import Label from '../../Label/Label';

var MaskedInput = require('react-maskedinput');


const mapStateToProps = (state) => {
    return {
        locations: state.business.locations,
        locationParams: state.demo.locationParams,
        locationIndex: state.demo.locationIndex
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: () => {
        dispatch({type: 'BUSINESS_DEMO_FOCUS', visibleDemo: -1})
    },
    updateLocation: (newLocations) => {
        dispatch({type: 'UPDATE_LOCATION', locations: newLocations});
    },
    locationHandler: (locationParams) => {
        dispatch({type: 'LOCATION_HANDLER', locationParams: locationParams})
    },

})


class LocationEditor extends React.Component {
    constructor(props) {
        super();
        console.log('LocationEditor');
        console.log(props)
        this.state = {
            position: {lat: 40.712842, lng: -74.006094},
            visible: false
        };

        this.saveLocation = () => {

            this.setState({
                ...this.state,
                visible: !this.state.visible
            });

            setTimeout(
                function () {
                    var newObj = update(this.props.locations, {$splice: [[[this.props.locationIndex], 1, this.props.locationParams]]});
                    console.log('updateLocation');
                    console.log(newObj);
                    this.props.updateLocation(newObj);
                }.bind(this)
                , 1000)

        }
        this.handleChange = (event, field) => {
            var locationParams;
            if (field === 'address') {
                locationParams = Object.assign({}, this.props.locationParams);
                locationParams[field] = event;
                this.props.locationHandler(locationParams);
            } else {
                event.preventDefault();
                locationParams = Object.assign({}, this.props.locationParams);
                locationParams[field] = event.target.value;
                this.props.locationHandler(locationParams);
            }

        }
        this.onChange = (address) => this.handleChange(address, 'address')
        /*  this.onChange = (address) => this.setState({...this.state, address})*/


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
            value: this.props.locationParams.address,
            onChange: this.onChange,
            placeholder: 'Metropolis, N.Y.'
        }

        const focusHandler = () => {
            console.log('work already')
            this.props.onFocus();
        }

        const handleSelect = (address, placeId) => {
        /*    this.setState({...this.state, address, placeId});
            console.log(placeId);*/
            this.handleChange(address, 'address')
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
                        <SimpleMapExample position={this.props.locationParams.position}></SimpleMapExample>
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
                                                 value={this.props.locationParams.open}
                                                 onChange={(e)=>this.handleChange(e,'open')}
                                                 style={{border: 'none !important', marginLeft: '5px'}}/>
                                    <div className="hidden_input_addition no-margin">
                                        <select value={this.props.locationParams.openPeriod}
                                                className="border-none"
                                                style={{border: 'none !important'}}
                                                onChange={(e)=>this.handleChange(e,'openPeriod')}>
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
                                                 value={this.props.locationParams.close}
                                                 onChange={(e)=>this.handleChange(e,'close')}
                                                 style={{border: 'none !important', marginLeft: '5px'}}/>
                                    <div className="hidden_input_addition no-margin">
                                        <select value={this.props.locationParams.closePeriod} className="border-none"
                                                style={{border: 'none !important'}}
                                                onChange={(e)=>this.handleChange(e, 'closePeriod')}>
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
                                                     value={this.props.locationParams.wkOpen}
                                                     onChange={(e)=>this.handleChange(e,'wkOpen')}
                                                     style={{border: 'none !important', marginLeft: '5px'}}/>
                                        <div className="hidden_input_addition no-margin">
                                            <select value={this.props.locationParams.wkOpenPeriod}
                                                    className="border-none"
                                                    style={{border: 'none !important'}}
                                                    onChange={(e)=>this.handleChange(e,'wkOpenPeriod')}>
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
                                                     value={this.props.locationParams.wkClose}
                                                     onChange={(e)=>this.handleChange(e,'wkClose')}
                                                     style={{border: 'none !important', marginLeft: '5px'}}/>
                                        <div className="hidden_input_addition no-margin">
                                            <select value={this.props.locationParams.wkClosePeriod}
                                                    className="border-none"
                                                    style={{border: 'none !important'}}
                                                    onChange={(e)=>this.handleChange(e,'wkClosePeriod')}>
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

                    <div onClick={this.saveLocation} style={{cursor: 'pointer'}}>
                        {this.state.visible ? null : <span >
<IoAndroidAdd /> Save
    </span>}
                    </div>

                    <Label visible={this.state.visible}></Label>

                </label>
            </div>
        )
    }
}

/**/

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditor)
