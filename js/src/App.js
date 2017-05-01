import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleMap from './SimpleMap';


class App extends Component {
    render () {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>NYSERDA Example</h2>
                </div>
                <p className="App-intro">
                    Load two-tier KMZ data from NYSERDA SLAMM Deliveries
                </p>
                {/*<SimpleMap/>*/}
            </div>
        );
    }
}

export default App;
