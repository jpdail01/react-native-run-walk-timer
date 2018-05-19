import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  elapsed: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '200',
    width: 150,
  },
  currentSegment: {
    color: 'lightblue',
    fontSize: 25,
    fontWeight: '200',
    width: 110,
  },
  run: {
    color: 'orange',
    fontSize: 20,
    fontWeight: '200',
    width: 100,
  },
  walk: {
    color: 'green',
    fontSize: 20,
    fontWeight: '200',
    width: 110,
  },
  goal: {
    color: 'cornflowerblue',
    fontSize: 20,
    fontWeight: '200',
    width: 110,
  },
  setIntervals: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
    //width: 110,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginTop: 80,
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
  }
})