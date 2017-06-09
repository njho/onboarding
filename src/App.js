import React, { Component } from 'react';
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

    render() {
        return (
            <div id="page-wrapper">
                <section id="wrapper">
                    <div className="header">
                    </div>

                    <EntryForm ></EntryForm>
                    <Footer></Footer>
                </section>

                <Demo products={this.state.products} companyName={this.state.companyName}></Demo>

            </div>
        );
    }
}

export default App;
