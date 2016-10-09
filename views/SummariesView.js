'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class SummariesView extends View{
  render() {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>
          SUMMARIES
        </Text>
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
