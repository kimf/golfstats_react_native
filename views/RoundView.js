import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import PlayStore from '../mobx/PlayStore'

import ScoringRoot from './Scoring/ScoringRoot'

export default class RoundView extends Component {
  render() {
    const { club, course } = this.props;
    return (
      <View style={styles.container}>
        <ScoringRoot club={club} course={course} store={PlayStore} holes={course.holes} />
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  }
});
