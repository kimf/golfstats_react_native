'use strict';

import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, ListView, View} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-mobx';
import { observer } from 'mobx-react/native'

import LoadingScreen from '../views/LoadingScreen'

@observer(['appStore'])
class CourseSelectionView extends Component{
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    this.state = {
      dataSource: ds.cloneWithRows(props.club.courses)
    };
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow (rowData, sectionID) {
    const { club, appStore } = this.props;
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={`${rowData.holes.length} Hål. Par: ${rowData.par}`}
        onPress={() => appStore.startPlaying(club, rowData)}
      />
    )
  }

  render() {
    return (
      <ListView
        style={styles.listview}
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
      />
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    padding: 10
  },
  listview: {
    backgroundColor: '#F5FBFD',
    flex: 1,
    marginTop: 64
  }
});

module.exports = CourseSelectionView;
