import React from 'react';
import { connect } from 'react-redux';
import {IoAndroidAdd, IoIosTrashOutline} from 'react-icons/lib/io/';
import update from 'immutability-helper';
import {Emoji} from 'emoji-mart'

const mapStateToProps = (state, ownProps) => {
    return {
        index: ownProps.index,
        emoji: ownProps.emoji,
        demoProduct: state.demo.demoProduct
    }
};

const mapDispatchToProps = dispatch => ({
    deleteEmoji: (demoProduct) =>{

        dispatch({type: 'DELETE_THE_EMOJI_ALREADY', visibleDemo: -1, demoProduct: demoProduct})
    }

});

const test = {
    cursor: 'pointer'
}


class EmojiDisplay extends React.Component {


    deleteEmoji(index) {
        var products1 = update(this.props.demoProduct, {emojis: {$splice: [[index, 1]]}})
        console.log(products1);
        this.props.deleteEmoji(products1)
    }


    render() {
        return (
            <div style={test}
                onClick={() => {this.deleteEmoji(this.props.index)}}>
                <Emoji emoji={this.props.emoji} size={24}></Emoji>
            </div>
        );


    }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(EmojiDisplay);