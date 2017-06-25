/**
 * Created by Machinatron on 2017-06-20.
 */
import React from 'react';
import { connect } from 'react-redux';
import Location from './Location.js';
import { CSSTransitionGroup } from 'react-transition-group';
import '../ProductEntry/InputField/example.css'
import update from 'immutability-helper'

const mapStateToProps = (state) => {
    return {
        locations: state.business.locations
    }
};

const mapDispatchToProps = dispatch => ({
    deleteProduct: (index, locations) => {
        var locations1 = update(locations, {$splice: [[index, 1]]})
        console.log('delete location');
        console.log(locations1);
        dispatch({type: 'DELETE_THE_LOCATION_ALREADY', visibleDemo: -1, locations: locations1})
    }

});

class ProductList extends React.Component {

    constructor() {
        super();

    }


    componentWillReceiveProps(nextProps) {
        console.log('ComponentWillReceiveProps')
        console.log(nextProps)
    }


    render() {
        const renderThis = () => {
            if(!this.props.locations) {
                return null
            } else {
                return(
                    this.props.locations.map((location, idx) => (
                        <div style={{padding: '5px 0px 5px 0px'}} key={idx}>
                            <Location location ={location} index={idx}></Location>
                            &nbsp;
                            &nbsp;
                        </div>

                    ))
                )
            }
        }

        return (
            <div className="documents-list">
                <CSSTransitionGroup
                    transitionName="documents-list"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    {renderThis()}

                </CSSTransitionGroup>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);