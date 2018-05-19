import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import RoundButton  from './RoundButton';
import { styles } from './styles';

export default function Timer({ interval, style, label }) {
  const pad = (n) => n < 10 ? '0' + n : n;
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{label}</Text>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}</Text>
    </View>
  );
}