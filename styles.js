import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc33', // '#F37349', // '#7BB632', //'#F57016', // '#F37349'
    alignItems: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  elapsed: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '200',
    alignItems: 'center',
    width: 130,
  },
  currentSegment: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '200',
    alignItems: 'flex-start',
    width: 130,
  },
  run: {
    color: 'red', // '#F57016',
    fontSize: 20,
    fontWeight: '200',
    width: 150,
  },
  walk: {
    color: 'green',
    fontSize: 20,
    fontWeight: '200',
    width: 150,
  },
  goal: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '200',
    width: 150,
  },
  setIntervals: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
    width: 300,
  },
  button: {
    width: 180,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lapTimer: {
    width: 30,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastest: {
    color: '#4BC05F',
  },
  slowest: {
    color: '#CC3531',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: 200,
  }
})