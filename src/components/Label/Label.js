/**
 * Created by Machinatron on 2017-06-20.
 */
import React from 'react';
import {connect} from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import update from 'immutability-helper';
import '../EntryForm/ProductEntry/InputField/example.css'

const mapStateToProps = (state, ownProps) => {
    return {
        visible: ownProps.visible
    }
};

const mapDispatchToProps = dispatch => ({});

class Label extends React.Component {

    constructor() {
        super();
        this.state = {visible: true}
    }

    toggle() {
        this.setState(
            {visible: !this.state.visible}
        )
        console.log(this.state.visible);
    }

    style = {
        height: '100px'
    }


    render() {
        var component;
        if (this.props.visible) {
            component = <div onClick={()=>this.toggle()}>
                <svg height="0.75em" width="0.75em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M9 19.414l-6.707-6.707 1.414-1.414L9 16.586 20.293 5.293l1.414 1.414"/>
                </svg>
                Saved
            </div>
        }


        return (
            <div className="example" style={{position: 'absolute'}}>
                <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    {component}
                </CSSTransitionGroup>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Label);

/*                */

/*                */