'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import { observer } from 'mobx-react/native'

@observer(['appStore'])
class SummariesView extends Component {
  render() {
    const { appStore } = this.props;
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>
          SUMMARIES GOES HERE
        </Text>
        {appStore.isPlaying
          ? <Button raised
              backgroundColor="green"
              icon={{name: 'ios-play', type: 'ionicon'}}
              title='RESUME ROUND'
              onPress={() => appStore.resumePlaying() }
            />
          : null}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 40,
    padding: 20,
    fontWeight: '900',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    color: 'green'
  }
});

module.exports = SummariesView;
