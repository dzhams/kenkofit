import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Pedometer } from 'expo-sensors'

const StepCounter = () => {
    const [isPedometerAvailable, setIsPedometerAvailable] =
        useState("");
    const [stepCount, updateStepCount] = useState(0);

    useEffect(() => {
        subscribe();
    }, [])

    subscribe = () => {
        const subscription = Pedometer.watchStepCount((result) => {
            updateStepCount(result.steps)
        })

        Pedometer.isAvailableAsync().then(
            result => {
                setIsPedometerAvailable(String(result))
            },
            error => {
                setIsPedometerAvailable(error)
            }
        );
    }

    return (
        <View>
            <Text>StepCounter: {isPedometerAvailable}</Text>
            <Text>{stepCount}</Text>
        </View>

    )
}

export default StepCounter

const styles = StyleSheet.create({})