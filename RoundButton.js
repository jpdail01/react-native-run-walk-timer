import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[ styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View>{/*  style={styles.buttonBorder}> */}
        <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
};