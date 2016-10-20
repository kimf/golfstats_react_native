import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { observer } from 'mobx-react/native'
import Hole from './Hole'
import HolePicker from './HolePicker'

@observer(['appStore']) class ScoringRoot extends Component {
  render() {
    const { appStore } = this.props;

    return (
      <View style={{flex:1}}>
        { appStore.currentHole ? <Hole  /> : <HolePicker /> }
        <Button small
          backgroundColor="#ccc"
          icon={{name: 'ios-alarm', type: 'ionicon'}}
          title='STOP ROUND'
          onPress={() => appStore.stopPlaying() }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

export default ScoringRoot
