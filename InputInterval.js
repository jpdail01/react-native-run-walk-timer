import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Picker } from 'react-native';
import moment from 'moment';
import RoundButton  from './RoundButton';
import { styles } from './styles';

export default function InputInterval({ minutes, seconds, style, label, setInterval }) {
  const pad = (n) => n < 10 ? '0' + n : n;  

  const timeOptions = [];
  for (let index = 0; index < 60; index++) {
    timeOptions.push(index);    
  }

  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{label}</Text>
      <Picker
        selectedValue={minutes}
        style={{ height: 35, width: 35, backgroundColor: '#999999' }}
        onValueChange={
          (itemValue, itemIndex) => {
            setInterval(label, 'Minutes', itemValue)
          }
        }
      >
        {timeOptions.map((option, index) => (
            <Picker.Item
              label={`${option}`}
              key={option}
              value={option}
            />
          ))
        }
      </Picker>
      <Text>&nbsp;&nbsp;&nbsp;</Text>
      <Text style={{ color: 'black' }}>:</Text>
      <Text>&nbsp;&nbsp;&nbsp;</Text>
      <Picker
        selectedValue={seconds}
        style={{ height: 35, width: 35, backgroundColor: '#999999' }}
        onValueChange={
          (itemValue, itemIndex) => {
            setInterval(label, 'Seconds', itemValue)
          }
        }
      >
        {timeOptions.map((option, index) => (
            <Picker.Item
              label={`${option}`}
              key={option}
              value={option}
            />
          ))
        }
      </Picker>
    </View>
  );
}