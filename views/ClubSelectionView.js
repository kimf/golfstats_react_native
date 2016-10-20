'use strict';

import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, ListView, View, AsyncStorage } from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import LoadingScreen from '../views/LoadingScreen'

var REQUEST_URL = 'http://golfstats.fransman.se/tisdagsgolfendata'

class ClubSelectionView extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };

    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.searchClub = this.searchClub.bind(this);
  }


  fetchData() {
    AsyncStorage.getItem('ClubStore').then(value => {
      if (value !== null){
        // We have data!!
        const clubs = JSON.parse(value);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(clubs),
          originalJSON: clubs,
          loaded: true,
        });
      } else {
        fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(responseData.clubs),
              originalJSON: responseData.clubs,
              loaded: true,
            });
            AsyncStorage.setItem('ClubStore', JSON.stringify(responseData.clubs));
          })
          .done();
      }
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  searchClub(query) {
    const { originalJSON } = this.state
    const searchResults = originalJSON.filter(club => club.name.toLowerCase().includes(query.toLowerCase()) )
    this.setState({dataSource: this.state.dataSource.cloneWithRows(searchResults)});
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={`${rowData.courses.length} Banor`}
        onPress={() => Actions.chooseCourse({club: rowData})}
      />
    )
  }

  render() {
    if(!this.state.loaded) { return <LoadingScreen/>; }

    return (
      <View style={styles.page}>
        <SearchBar
          lightTheme
          onChangeText={(query) => this.searchClub(query)}
          placeholder='Sök klubb...' />
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
        </List>
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
  listview: {
    backgroundColor: '#F5FBFD',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    padding: 10
  },
  page: {
    flex: 1,
    paddingTop: 64,
   }
});

module.exports = ClubSelectionView;
