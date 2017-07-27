import React, { Component } from 'react'
import autobahn from 'autobahn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as priceActions from '../actions/price';
import './App.css';
import logo from './logo.svg';

const currencyPair = global.CURRENCY_PAIR;
class App extends Component {
  componentDidMount() {
    this.currencyPair = window.CURRENCY_PAIR;
    this.currencyPair = currencyPair;
    this.connection = new autobahn.Connection({
      url: 'wss://api.poloniex.com/',
      realm: 'realm1',
    });
    this.connection.onopen = (session) => {
      session.subscribe('ticker', (priceData) => {
        if (priceData[0] === this.currencyPair.replace('/', '_')) {
          console.log(priceData);
          this.props.priceActions.set({price: parseFloat(priceData[1]), date: Date.now()});
        }
      });
    };
    this.connection.open();
  }

  componentWillUnmount() {
    //this.connection.close();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cryptocurrency Price Watch</h2>
        </div>
        <div className="App-prices">
          <div>
          Latest Price: {this.props.price} {this.currencyPair}
          </div>
          <div>
          1 Minute Moving Average: {this.props.average} {this.currencyPair}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  price: state.price.price,
  average: state.price.average,
});

const mapDispatchToProps = (dispatch) => ({
  priceActions: bindActionCreators(priceActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
