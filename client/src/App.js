import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <Header/>
            </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div className="footer">
              <Footer/>
          </div>
      </div>
    );
  }
}

export default App;
