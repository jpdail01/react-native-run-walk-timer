import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import RoundButton  from './RoundButton';
import { styles } from './styles';

export default function Timer({ interval, style, label }) {
  const pad = (n) => n < 10 ? '0' + n : n;

  return (
    <View style={styles.timerContainer}>
      <Text 
        style={{ 
          height: 60, 
          width: 120, 
          color: 'white', 
          fontSize: 25, 
          fontWeight: 'normal', 
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {label}
      </Text>
      <Text style={{ height: 60, width: 50, color: 'white', fontSize: 40, fontWeight: '200', }}>
        {pad(interval.m)}
      </Text>
      <Text>&nbsp;&nbsp;&nbsp;</Text>
      <Text style={{ color: 'white', fontSize: 40, fontWeight: '200', }}>:</Text>
      <Text>&nbsp;&nbsp;&nbsp;</Text>
      <Text style={{ height: 60, width: 50, color: 'white', fontSize: 40, fontWeight: '200', }}>
        {pad(interval.s)}
      </Text>
    </View>
  );
}