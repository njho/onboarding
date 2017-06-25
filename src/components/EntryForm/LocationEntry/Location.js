/**
 * Created by Machinatron on 2017-06-01.
 */
import React from 'react';
import { connect } from 'react-redux';
import {IoAndroidRemove, IoAndroidAdd, IoIosTrashOutline} from 'react-icons/lib/io/';
import ReactDOM from 'react-dom';
import DeleteButton from '../delete';
import update from 'immutability-helper'


const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        index: ownProps.index,
        locations: state.business.locations
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: (index, location) => {
        dispatch({type: 'LOCATION_DEMO_FOCUS', locationEditor: true, locationIndex: index, locationParams: location})
    },
    changeHandler: (newlocations) => {
        dispatch({type: 'LOCATION_HANDLER', newlocations: newlocations})
    },
    deleteLocation: (locations) =>{
        dispatch({type: 'DELETE_THE_LOCATION_ALREADY', locations: locations})
    }

})

const test2 = {
    cursor: 'pointer',
    float: 'right',
    display: 'inline-block !important'

}
const test1 = {
    cursor: 'pointer',
    float: 'left',
    display: 'inline-block !important',
    width: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden'

}

class Location extends React.Component {

    constructor() {
        super();
        this.state = {
        };

        this.deleteLocation = (index) => {
            var locations1 = update(this.props.locations, {$splice: [[index, 1]]})
            this.props.deleteLocation(locations1)
        }
    }

    focusHandler = ()=> {
        console.log('focushandler');
        this.props.onFocus(this.props.index, this.props.location);
    }

    render() {

        return (
            <div style={{verticalAlign: 'middle'}} >
                <div className="green" style={test1} onClick={this.focusHandler}>
                    <div  onClick={()=>this.focusHandler}>
                        {this.props.location.address}
                    </div>
                </div>
                <div style={test2}
                     onClick={() => {this.deleteLocation(this.props.index)}}>
                    <IoIosTrashOutline />
                </div>
            </div>
        )


    }
}

/*                            <textarea type="text" rows="3" maxLength="300" name="location[Phrase]" id="Phrase"
 placeholder="Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman!"
 onChange={(e) => changeHandler(e, this.props.index, 'giftPhrase')}/>
 */

export default connect(mapStateToProps, mapDispatchToProps)(Location);