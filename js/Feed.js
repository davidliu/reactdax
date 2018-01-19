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
  time: number,
  low: number,
  high: number,
  open: number,
  close: number,
  volume: number
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
        keyExtractor={(item: DataRow, index: number) => String(index)}
        onRefresh={this.handleRefresh.bind(this)}
        refreshing={this.state.refreshing}
      />
    );
  }

  fetchData() {
    fetch("https://api.gdax.com/products/ETH-USD/candles?granularity=60")
      .then((response) => response.json())
      .then((responseJson) => this._parseCandles(responseJson))
      .then((rows) =>
        this.setState({
          isLoading: false,
          data: rows,
          refreshing: false
        })
      )
  }

  _parseCandles(candlesJson: Object): Array<DataRow> {
    let rows: Array<DataRow> = candlesJson.map((candle) => {
      let candleRow: DataRow = {
        time : candle[0],
        low : candle[1],
        high : candle[2],
        open : candle[3],
        close : candle[4],
        volume : candle[5]
      };
      return candleRow;
    })
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
    let item: DataRow = args.item
    return (
      <Text>
        {item.time + " - " + item.open + " - " + item.close}
      </Text>
    );
  }
}
