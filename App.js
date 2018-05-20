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
      runMinutes: 4,
      runSeconds: 0,
      walkMinutes: 1,
      walkSeconds: 0,
      goalMinutes: 30,
      goalSeconds: 0,
      segments: [ ],
      currentLabel: 'WALK',
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

  pause = () => {
    clearInterval(this.timer);
    const { 
      now, 
      start 
    } = this.state;

    this.setState({
      //start: 0,
      //now: 0,
    });

  }

  reset = () => {
    this.setState({
      start: 0,
      now: 0,
    });

  }
  
  resume = () => {
    // Tts.speak('Hello, world!');

    const now = new Date().getTime();

    this.setState({
      start: now,
      now,
    });

    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100);

  }

  setInterval(type, value, duration) {
    console.log('type:  ' + type);
    console.log('value:  ' + value);
    console.log('duration:  ' + duration);

    /*
    runMinutes: 4,
      runSeconds: 0,
      walkMinutes: 1,
      walkSeconds: 0,
      goalMinutes: 30,
      goalSeconds: 0,
    */
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
      <View style={{ 
        flex: 1, 
        backgroundColor: this.state.currentLabel === 'WALK' ? '#7BB632' : '#ff9933', // '#ffcc33', // '#F37349', // '#7BB632', //'#F57016', // '#F37349'
        alignItems: 'flex-start',
        paddingTop: 80,
        paddingHorizontal: 20,
      }}>
        <Timer
          label={this.state.currentLabel}
          interval={timer}
          // {segments.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.currentSegment}
        />
        <Timer
          label="Elapsed"
          interval={timer}
          style={styles.elapsed}
        />
        <Text>{"\n"}</Text>
        <Text style={styles.setIntervals}>Set Your Intervals (MM : SS)</Text>
        <Text>{"\n"}</Text>
        <InputInterval
          label="Run"
          minutes={runMinutes}
          seconds={runSeconds}
          style={styles.run}
          setInterval={this.setInterval}
        />
        <InputInterval
          label="Walk"
          minutes={walkMinutes}
          seconds={walkSeconds}
          style={styles.walk}
          setInterval={this.setInterval}
        />
        <InputInterval
          label="Total Workout"
          minutes={goalMinutes}
          seconds={goalSeconds}
          style={styles.goal}
          setInterval={this.setInterval}
        />
        {start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Start'
              color='white' // '#50D167'
              background= 'green' // '#1B361F'
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Pause'
              color='#FFFFFF'
              background='#990000'
              onPress={this.pause}
            />
          </ButtonsRow>
        )}
        {timer > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
            <RoundButton
              title='Resume'
              color='black' // '#50D167'
              background='#ffcc33' // '#1B361F'
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
      </View>
    );
  }
}
