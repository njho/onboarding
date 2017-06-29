/**
 * Created by Machinatron on 2017-06-20.
 */
import React from 'react';
import { connect } from 'react-redux';
import EmojiDisplay from './Emoji'
import { CSSTransitionGroup } from 'react-transition-group';
import './InputField/example.css'
import update from 'immutability-helper'

const mapStateToProps = (state) => {
    return {
        product: state.demo.demoProduct
    }
};

const mapDispatchToProps = dispatch => ({
});

class EmojiList extends React.Component {

    constructor() {
        super();

    }

    render() {
        const renderThis = () => {
            if(!this.props.product.emojis) {
                return null
            } else {
                return(
                    this.props.product.emojis.map((emoji, idx) => (
                            <EmojiDisplay emoji ={emoji} index={idx}></EmojiDisplay>
                    ))
                )
            }
        }

        return (

                <CSSTransitionGroup
                    transitionName="documents-list"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    component="div"
                    className="documents-list emoji-style"
                >
                    {renderThis()}

                </CSSTransitionGroup>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiList);