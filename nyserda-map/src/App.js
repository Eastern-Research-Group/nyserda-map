import React, {Component} from 'react';
import './App.css';
import Map from './components/Map';
import Control from './components/Control';
// import Debug from './components/Debug';
// import Version from './components/Version';
import Legend from './components/Legend';


class App extends Component {
    render () {
        return (
            <div className="App">
                <Map/>
                <Control/>
                <Legend/>
                {/*<Version/>*/}
                {/*<Debug/>*/}
            </div>
        );
    }
}

export default App;
