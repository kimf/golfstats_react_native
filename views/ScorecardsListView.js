'use strict';
import React, { Component } from 'react';
import { StyleSheet, ListView, Text, View } from 'react-native';

var _ = require('lodash');
var moment = require('moment');

var LoadingScreen = require('./LoadingScreen');
var ScorecardDetailView = require('./ScorecardDetailView');
var ScorecardRow = require('../components/ScorecardRow');

var REQUEST_URL = 'http://golfstats.fransman.se/scorecards';
//var REQUEST_URL = 'http://localhost:9292/scorecards?year=2015';

var sectionIDs = [];
var rowIDs = [];
var dataBlob = {};
var scorecards = [];

var ScorecardsListView = React.createClass({
  getInitialState: function() {
    var getSectionHeaderData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };

    var dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionHeaderData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    return {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      loaded: false
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        scorecards = responseData.scorecards.reverse();

        var groupedScorecards = _.groupBy(scorecards, function(s){ return moment(s.date).format("MMMM YYYY")} );
        _.forEach(groupedScorecards, function(n, key) {
          sectionIDs.push(key);
          dataBlob['s'+key] = key;

          var scorecardIDs = []
          _.forEach(n, function(s){
            scorecardIDs.push(s.id)
            dataBlob['row'+s.id] = s.id;
          });
          rowIDs.push(scorecardIDs);
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
          loaded: true,
        });
      })
      .done();
  },

  renderRow: function(rowData: string, sectionID: string, rowID: string): ReactElement {
    var scorecard = _.filter(scorecards, { 'id': rowID})[0]
    return (
      <ScorecardRow
        onSelect={() => this.selectRow(scorecard)}
        scorecard={scorecard}
      />
    );
  },


  renderSectionHeader: function(sectionData: string, sectionID: string) {
    return (
      <View style={styles.section}>
        <Text style={styles.text}>
          {sectionID}
        </Text>
      </View>
    );
  },

  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <View style={styles.header}>
          <Text style={[styles.text, styles.headerText]}>
            Scorecards
          </Text>
        </View>
        <ListView
          style={styles.listview}
          dataSource={this.state.dataSource}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000}
        />
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <LoadingScreen/>
    );
  },

  selectRow: function(scorecard) {
    this.props.navigator.push({
      title: 'Scorecard',
      component: ScorecardDetailView,
      passProps: {scorecard},
    });
  }
});

var styles = StyleSheet.create({
  listview: {
    backgroundColor: '#F5FBFD',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontFamily: 'Helvetica Neue'
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#73797C',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff'
  },
  page: {
    flex: 1,
    paddingTop: 64,
   },
});

module.exports = ScorecardsListView;
