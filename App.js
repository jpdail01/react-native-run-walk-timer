import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
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

    this.timerUp = 0;
    this.timerDown = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.countUp = this.countUp.bind(this);

    this.state = {
      runMinutes: 1,
      runSeconds: 0,
      walkMinutes: 0,
      walkSeconds: 30,
      goalMinutes: 18,
      goalSeconds: 0,
      segments: [ ],
      currentLabel: 'RUN',
      segmentIndex: 0,
      countUpTime: 0, 
      countDownTime: 0, 
      secondsUp: 0,
      secondsDown: 0,
      status: 'stopped',
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerDown);
    clearInterval(this.timerUp);
  }

  componentDidMount(){
    this.setSegments('Run', 'Minutes', 1);
    this.setState({ countDownTime: 0, countUpTime: 0 });
  }

  startTimer() {
    if (this.timerUp == 0) {
      this.timerUp = setInterval(this.countUp, 1000);
    }

    if (this.timerDown == 0) {
      this.timerDown = setInterval(this.countDown, 1000);
    }

    this.setState({
      status: 'started'
    }, () => {});
  }

  countUp() {
    let seconds = this.state.secondsUp + 1;
    this.setState({
      countUpTime: this.secondsToTime(seconds),
      secondsUp: seconds,
    });
    
    const goal = (this.state.goalMinutes * 60) + this.state.goalSeconds;
    if (seconds === goal) { 
      clearInterval(this.timerUp);
      // this.timerUp = 0;

      Alert.alert(
        'Workout Complete!',
        'Way to go!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )

      this.setState({
        status: 'paused'
      }, () => {});
    }
  }

  countDown() {
    let seconds = this.state.secondsDown - 1;
    this.setState({
      countDownTime: this.secondsToTime(seconds),
      secondsDown: seconds,
    });

    if (seconds === 0) { 
      clearInterval(this.timerDown);
      // clearInterval(this.timerUp);

      this.setState({
        segmentIndex: this.state.segmentIndex + 1
      }, () => {});

      if(this.state.segments.length - 1 < this.state.segmentIndex){
        return;
      }

      this.state.currentLabel === 'WALK' 
        ? 
        this.setState({
          currentLabel: 'RUN',
        }, () => {}) 
        : 
        this.setState({
          currentLabel: 'WALK',
        }, () => {});
    
      seconds = this.state.segments[this.state.segmentIndex];
      this.setState({
        countDownTime: this.secondsToTime(seconds),
        secondsDown: seconds,
      });

      this.timerDown = setInterval(this.countDown, 1000);
      // this.timerUp = setInterval(this.countUp, 1000);
    }
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  setSegments = (type, value, duration) => {
    clearInterval(this.timerDown);
    clearInterval(this.timerUp);

    if(type === 'Total Workout') type = 'goal';
    this.setState({
      [type.toLowerCase() + value]: duration
    }, () => {});

    const { 
      runMinutes, runSeconds, walkMinutes, walkSeconds, goalMinutes, goalSeconds 
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
        segments: newSegments,
        secondsDown: newSegments[0],
        secondsUp: 0,
        segmentIndex: 0,
        currentLabel: 'RUN',
      }, () => {});
    }
    else {
      Alert.alert(
        'Run/Walk Intervals',
        'Make sure your intervals add up to your Total Workout',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    }
  }

  pause = () => {
    clearInterval(this.timerDown);
    clearInterval(this.timerUp);

    this.setState({
      status: 'paused'
    }, () => {});
  }

  reset = () => {
    this.timerUp = 0;
    this.timerDown = 0;

    this.setState({
      segmentIndex: 0,
      currentLabel: 'RUN',
      countUpTime: {}, // 0
      countDownTime: {}, // 0 
      status: 'stopped',
    }, () => {});

    this.setSegments('Run', 'Minutes', this.state.runMinutes);
  }
  
  resume = () => {
    this.timerDown = setInterval(this.countDown, 1000);
    this.timerUp = setInterval(this.countUp, 1000);

    this.setState({
      status: 'started'
    }, () => {});
  }

  render() {
    const {
      segments,
      runMinutes,
      runSeconds,
      walkMinutes,
      walkSeconds,
      goalMinutes,
      goalSeconds,
      segmentIndex,
    } = this.state;

    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: this.state.currentLabel === 'WALK' ? '#04A2D2' : '#ff9933', // '#ffcc33', // '#F37349', // '#7BB632', //'#F57016', // '#F37349'
        alignItems: 'flex-start',
        paddingTop: 80,
        paddingHorizontal: 20,
      }}>
        <Timer
          label={this.state.currentLabel}
          interval={this.state.countDownTime}
          style={styles.currentSegment}
        />
        <Timer
          label="Elapsed"
          interval={this.state.countUpTime}
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
          setSegments={this.setSegments}
        />
        <InputInterval
          label="Walk"
          minutes={walkMinutes}
          seconds={walkSeconds}
          style={styles.walk}
          setSegments={this.setSegments}
        />
        <InputInterval
          label="Total Workout"
          minutes={goalMinutes}
          seconds={goalSeconds}
          style={styles.goal}
          setSegments={this.setSegments}
        />
        {this.state.status === 'stopped' && (
          <ButtonsRow>
            <RoundButton
              title='Start'
              color='white' // '#50D167'
              background= '#7BB632' // '#1B361F'
              onPress={this.startTimer}
            />
          </ButtonsRow>
        )}
        {this.state.status === 'started' && (
          <ButtonsRow>
            <RoundButton
              title='Pause'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.pause}
            />
          </ButtonsRow>
        )}
        {this.state.status === 'paused' && (
          <ButtonsRow>            
            <RoundButton
              title='Resume'
              color='black' // '#50D167'
              background='#ffcc33' // '#1B361F'
              onPress={this.resume}
            />
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
          </ButtonsRow>
        )}
      </View>
    );
  }
}
