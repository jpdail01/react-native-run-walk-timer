import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Picker } from 'react-native';
import moment from 'moment';
import RoundButton  from './RoundButton';
import { styles } from './styles';

export default function InputInterval({ interval, style, label }) {
  const pad = (n) => n < 10 ? '0' + n : n;  

  const timeOptions = [];
  for (let index = 0; index < 60; index++) {
    timeOptions.push(index);    
  }
  //timeOptions.fill(0, 0, 59);
  //timeOptions.from(timeOptions, x => x + 1);

  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{label}</Text>
      <Picker
        selectedValue={4}//this.state.runMinutes}
        style={{ height: 35, width: 50, backgroundColor: 'grey' }}
        onValueChange={
          (itemValue, itemIndex) => 
            this.setState(
              {
                runMinutes: itemValue
              }
          )
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
      <Text style={{ color: 'white' }}>:</Text>
      <Text>&nbsp;&nbsp;&nbsp;</Text>
      <Picker
        selectedValue={0}
        style={{ height: 35, width: 50, backgroundColor: 'gray' }}
        onValueChange={
          (itemValue, itemIndex) => 
            this.setState(
              {
                runSeconds: itemValue
              }
          )
        }
      >
      </Picker>
    </View>
  );
}