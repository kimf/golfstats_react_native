'use strict';
import React, { Component, PropType } from 'react';
import { StyleSheet, Text, View } from 'react-native';


var Panel = React.createClass({
  render: function() {
    return (
      <View style={styles.panel}>
        <Text style={styles.panel__label}>{this.props.label}</Text>
        <Text style={styles.panel__text}>
          {this.props.text}
        </Text>
      </View>
    );
  }
})

var styles = StyleSheet.create({
  panel: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  panel__label: {
    width: 80,
    fontWeight: "300",
    color: '#777777',
    fontFamily: 'Helvetica Neue'
  },
  panel__text: {
    flex: 1,
    fontFamily: 'Helvetica Neue'
  },
});

module.exports = Panel;
