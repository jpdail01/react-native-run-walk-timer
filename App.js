import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import RoundButton  from './RoundButton';
import Timer from './Timer';
import InputInterval from './InputInterval';
import ButtonsRow from './ButtonsRow';
import Lap from './Lap';
import LapsTable from './LapsTable';
import { styles } from './styles';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      now: 0,
      runMinutes: 240,
      runSeconds: 0,
      walkMinutes: 60,
      walkSeconds: 0,
      goalMinutes: 1800,
      goalSeconds: 0,
      segments: [ ],
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount(){
    this.setSegments();
  }

  start = () => {
    const now = new Date().getTime();

    this.setState({
      start: now,
      now
    });

    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100);

  }
  
  setSegments = () => {
    const { 
      segments, runMinutes, runSeconds, walkMinutes, walkSeconds, goalMinutes, goalSeconds 
    } = this.state;
    const goal = (goalMinutes * 60) + goalSeconds;
    const run = (runMinutes * 60) + runSeconds;
    const walk = (walkMinutes * 60) + walkSeconds;
    const numberOfSegments = goal / (run + walk);
    const areSegmentsEven = goal % (run + walk) === 0 ? true : false;
    let newSegments = [];

    if(areSegmentsEven){
      for (let i = 1; i <= numberOfSegments; i++) {
        newSegments.push(run);
        newSegments.push(walk);        
      }

      this.setState({
        segments: newSegments
      });
    }
    else {
      // TODO: throw ERROR!!!
    }
  }

  stop = () => {
    clearInterval(this.timer);
    const { 
      now, 
      start 
    } = this.state;

    this.setState({
      start: 0,
      now: 0,
    });

  }

  reset = () => {
    this.setState({
      start: 0,
      now: 0,
    });

  }
  
  resume = () => {
    const now = new Date().getTime();

    this.setState({
      start: now,
      now,
    });

    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100);

  }

  render() {
    const { 
      now, 
      start, 
      segments,
      runMinutes,
      runSeconds,
      walkMinutes,
      walkSeconds,
      goalMinutes,
      goalSeconds,
    } = this.state;
    const timer = now - start;

    return (
      <View style={styles.container}>
        <Timer
          label="Current"
          interval={segments.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.currentSegment}
        />
        <Timer
          label="Elapsed"
          interval={timer}
          style={styles.elapsed}
        />
        <Text>{"\n"}{"\n"}</Text>
        <Text style={styles.setIntervals}>Set Intervals</Text>
        <InputInterval
          label="Run"
          interval={(runMinutes * 60) + runSeconds}
          style={styles.run}
        />
        <InputInterval
          label="Walk"
          interval={(walkMinutes * 60) + walkSeconds}
          style={styles.walk}
        />
        <InputInterval
          label="Total Workout"
          interval={(goalMinutes * 60) + goalSeconds}
          style={styles.goal}
        />
        {segments.length === 0 && (
          <ButtonsRow>
            <RoundButton
              title='GO!'
              color='#50D167'
              background='#1B361F'
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Stop'
              color='#E33935'
              background='#3C1715'
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {segments.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
            <RoundButton
              title='GO!'
              color='#50D167'
              background='#1B361F'
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
      </View>
    );
  }
}
