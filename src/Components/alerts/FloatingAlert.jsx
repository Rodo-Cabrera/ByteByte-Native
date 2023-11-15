import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Vibration } from 'react-native';

const FloatingAlert = ({type, title, action}) => {


    const [dimensions, setDimensions] = useState({})

    const {width} = dimensions

    const animatedValues = {
        opacity: useRef(new Animated.Value(0)).current,
        progress: useRef(new Animated.Value(0)).current
    }

    const {opacity, progress} = animatedValues;

    useEffect(() => {
        handleAnimated();
    }, [action])

    const handleAnimated = () => {
        Vibration.vibrate();
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: false
            }),
            Animated.timing(progress, {
                toValue: 1,
                duration: 4500,
                useNativeDriver: false
            })
        ]).start(({finished}) => {
            if (finished) {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: false
                }).start(({finished}) => {
                    if (finished) {
                        progress.setValue(0);
                    }
                })
            } else {
                Animated.parallel([
                    Animated.spring(progress, {
                        toValue: 1,
                        useNativeDriver: false
                    }),
                    Animated.spring(opacity, {
                        toValue: 1,
                        useNativeDriver: false
                    })
                ]).start()
            }
        })
    }

    const animatedContainer = {
        opacity: opacity
    }

    const progressStyles = {
        width: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, width ? width : 100]
        })
    };

    const saveDimensions = ({nativeEvent: {layout: {height, width}}}) => {
       setDimensions({
        height,
        width
       })
    }


  return (
    <Animated.View style={[styles.container, animatedContainer]}>
        <View style={[styles.box, {backgroundColor: type == 1 ? '#15CE00' : type == 2 ? '#0092E6' : 'yellow'}]}>
            <View style={styles.icon}>
                {
                    type === 1 || type === 2 ?
                    <MaterialCommunityIcons name={type === 1 ? 'crown-circle' : 'shield-crown'} size={30} color="black" />
                    :
                    <FontAwesome name="user" size={30} color="black" />
                }
            </View>
            <View style={styles.titleBox}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View  style={{width: 18, height: 18}} />
        </View>
        <View style={styles.progressBarContainer} onLayout={saveDimensions}>
                <Animated.View style={[styles.progressBar, progressStyles]} />
        </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '95%',
        position: 'absolute',
        bottom: 10,
        overflow: 'hidden',
        zIndex: 10,
        borderRadius: 40,
    },
    box: {
        height: 'auto',
        alignSelf: 'stretch',
        backgroundColor: '#15CE00',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        paddingLeft: 1
    },
    titleBox: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: '700',
        fontSize: 14,
        color: '#000',
        textAlign: 'center'
    },
    progressBarContainer: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff'
    },
    progressBar: {
        height: 3,
        backgroundColor: 'rgb(255, 204, 0)'
    }
})

export default FloatingAlert