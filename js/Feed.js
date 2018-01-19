/**
 * @flow
 */

import React, { Component } from 'react';
import { ActivityIndicator, ListView, FlatList, Text, View, StyleSheet } from 'react-native';

type State = {
  isLoading: boolean,
  data: Array<DataRow>,
  refreshing: boolean
}

type DataRow = {
  baseCurrency: string,
  targetCurrency: string,
  rate: string
}
export default class Feed extends Component<Object, State> {
  constructor(props: Object) {
    super(props)

    this.state = {
      isLoading: false,
      data: [],
      refreshing: false
    }
  }

  render() {
    // console.log("rendering list");
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={(item: DataRow, index: number) => item.targetCurrency}
        onRefresh={this.handleRefresh.bind(this)}
        refreshing={this.state.refreshing}
      />
    );
  }

  fetchData() {
    fetch("https://api.coinbase.com/v2/exchange-rates?currency=BTC")
      .then((response) => response.json())
      .then((responseJson) => this._parseExchangeRates(responseJson))
      .then((rows) =>
        this.setState({
          isLoading: false,
          data: rows,
          refreshing: false
        })
      )
  }

  _parseExchangeRates(json: Object) {
    let data = json.data;
    let baseCurrency = data.currency
    console.log(baseCurrency)
    let rates = data.rates
    let rows: Array<DataRow> = [];
    for (var key in rates) {
      if(!rates.hasOwnProperty(key)) continue;

      let row: DataRow = {
          baseCurrency: baseCurrency,
          targetCurrency: key,
          rate: rates[key]
      }
      rows.push(row)
    }

    return rows;
  }
  componentDidMount() {
    this.fetchData();
  }

  handleRefresh(){
    this.setState({refreshing: true});
    this.fetchData();
  }
  renderItem(args: Object) {
    return (
      <Text>
        {args.item.baseCurrency + " - " + args.item.targetCurrency + " - " + args.item.rate}
      </Text>
    );
  }
}
