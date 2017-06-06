import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './index.css';
import './main.css';
import EntryForm from './components/EntryForm';
import Demo from './components/Demo';
import Footer from './components/Footer';


class App extends Component {
    constructor() {
        super();
        this.state = {
            products: [{name: 'A Meeting with Superman!'}],
            companyName: 'The Daily Planet'
        };
    }

    handleAddProduct = () => {
        console.log('Add Product');
        this.setState({products: this.state.products.concat([{name: ''}])});
    }

    handleProductNameChange = (e, idx) => {
        const target = e.target;
        const name = target.name;

        var newValue = this.state.products;
        newValue[idx].name = e.target.value;

        this.setState({
            products: newValue
        });
    }

    handleChangeBusiness = (e) => {
        const name = e.target.value;
        this.setState({
            companyName: name,
        })
    }

    handleRemoveProduct = (idx) => {
        this.setState({
            products: this.state.products.filter((s, sidx) => idx !== sidx)
        });
    }

    componentWillMount() {
        console.log(this.state);
    }


    render() {
        return (
            <div id="page-wrapper">
                <section id="wrapper">
                    <div className="header">
                    </div>
                    <EntryForm value={this.state.products} addProduct={()=>this.handleAddProduct()}
                               changeProducts={(e,idx)=> this.handleProductNameChange(e,idx)}
                               changeBusiness={(e) => this.handleChangeBusiness(e)} removeProduct = {(idx)=>this.handleRemoveProduct(idx)}></EntryForm>
                    <Footer></Footer>
                </section>

                <Demo products={this.state.products} companyName={this.state.companyName}></Demo>

            </div>
        );
    }
}

export default App;
