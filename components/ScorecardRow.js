'use strict';

import React, { Component, PropType } from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';


var MetaHeader = require('./MetaHeader');
var ScoreRow = require('./ScoreRow');
var DataRow = require('./DataRow');

var ScorecardRow = React.createClass({
  underlayColor: function() {
    return '#D3EED5';
  },

  render: function() {
    var scorecard = this.props.scorecard;
    return (
      <TouchableHighlight underlayColor={this.underlayColor()} onPress={this.props.onSelect}>
        <View key={scorecard.id} style={styles.wrapper}>
          <MetaHeader course={scorecard.course.toUpperCase()} date={scorecard.date} />
          <DataRow wrapper_style={styles.data_row} scorecard={scorecard} />
          <ScoreRow wrapper_style={styles.score_row} scores={scorecard.consistency} />
        </View>
      </TouchableHighlight>
    );
  }
})

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E7ECEE',
    flexDirection: 'column',
    marginBottom: 5
  },
  score_row: {
    flex: 1,
  },
  data_row: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  }
});

module.exports = ScorecardRow
