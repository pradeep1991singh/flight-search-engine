import React, { Component } from 'react';

import './app.css';
import './reset.css';

import Header from './header/Header';
import Search from './search/Search';
import Flights from './flights/Flights';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <section className="app__content">
          <Search></Search>
          <Flights></Flights>
        </section>
      </div>
    );
  }
}

export default App;
