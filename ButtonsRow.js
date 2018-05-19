import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import RoundButton  from './RoundButton';
import { styles } from './styles';

export default function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  );
}