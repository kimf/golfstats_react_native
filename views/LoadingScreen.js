'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

var LoadingScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.loading}>
        <Text>
          Loading Data...
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = LoadingScreen;
