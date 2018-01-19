/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Feed from "./js/Feed"

type State = {
  json: string
}

export default class App extends Component<void, State> {

  feed: Feed | null;

  constructor(props: void) {
    super(props);
  }

  render() {
    return (
      <Feed ref={(feed) => {this.feed = feed}} style={styles.container} />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
