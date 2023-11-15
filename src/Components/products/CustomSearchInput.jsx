import { View, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const CustomSearchInput = () => {

    const animatedValues = {
        opacity: useRef(new Animated.Value(1)).current,
        scale: useRef(new Animated.Value(0)).current
    }

    

    const {opacity, scale} = animatedValues;

    const handleAnimated = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start(({finished}) => {
            if (finished) {
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false
                }).start()
                Animated.timing(scale, {
                    toValue: 2,
                    duration: 1000,
                    useNativeDriver: false
                }).start(({finished})=> {
                    if (finished) {
                        Animated.timing(scale, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: false
                        }).start()
                    }
                })
            }
        })
    }

    const animatedStyles = {
        opacity: opacity,
        transform: [
            {
                scale: scale
            }
        ]
    }  

  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handleAnimated()}>
            <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
    </View>
  )
}

export default CustomSearchInput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 90
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'tomato',
    }
})