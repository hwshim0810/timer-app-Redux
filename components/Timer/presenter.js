import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Button from '../Button';


function formatTime(time) {
    if (parseInt(time) < 0) return '00:00';

    let minute = Math.floor(time/60);
    let second = parseInt(time % 60, 10);
    
    return `${minute < 10 ? `0${minute}`: minute}:${second < 10 ? `0${second}`: second}`;
}


class Timer extends Component {

    // Components 가 새로운 Props 를 얻을 때
    componentWillReceiveProps(nextProps) {
        const currentProps = this.props;

        if (!currentProps.isPlaying && nextProps.isPlaying) {
            const timerInterval = setInterval(() => {
                currentProps.addSecond()
            }, 1000);

            this.setState({
                timerInterval
            });
        } else if (currentProps.isPlaying && !nextProps.isPlaying) {
            clearInterval(this.state.timerInterval);
        }
    }

    render() {
        const  { 
            isPlaying, 
            elapsedTime, 
            timerDuration,
            startTimer,
            restartTimer,
            addSecond
        } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.upper}>
                    <Text style={styles.time}>
                        {formatTime(timerDuration - elapsedTime)}
                    </Text>
                </View>
                <View style={styles.lower}>
                    {!isPlaying && (
                        <Button iconName="play-circle" onPress={startTimer} />
                    )}
                    {isPlaying && (
                        <Button iconName="stop-circle" onPress={restartTimer} />
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CE0B24"
    },
    upper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    lower: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    time: {
        color: "white",
        fontSize: 120,
        fontWeight: "100"

    }
});

export default Timer;