/**
 * Created by Machinatron on 2017-06-01.
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import ProductEditor from './ProductEditor.js';
import ProductEntry from './ProductEntry.js';


const mapStateToProps = (state) => {
    return {
        editor: state.demo.editor,
        reRender: state.demo.reRender
    }
};

const mapDispatchToProps = dispatch => ({})

class ProductEntryParent extends React.Component {
    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) { console.log(nextProps)
    }

    render() {

        var renderWhat = () => {
            if (this.props.editor === false) {
                return (
                    <ProductEntry></ProductEntry>
                )
            } else {
                return (
                        <ProductEditor></ProductEditor>
                )
            }
        }

        return(
            <div>
                {renderWhat()}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductEntryParent);