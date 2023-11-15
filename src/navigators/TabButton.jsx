import React, {useEffect, useRef} from 'react';
import { Text, StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const TabButton = ({item, accessibilityState, onPress}) => {


    const animatedValues = {
        translate: useRef(new Animated.Value(0)).current,
        scale: useRef(new Animated.Value(0)).current
    }

    const {translate, scale} = animatedValues

    useEffect(() => {
        handleAnimated();
    },[accessibilityState.selected])


    const handleAnimated = () => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 400,
                useNativeDriver: false
            }),
            Animated.timing(scale, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 250,
                useNativeDriver: false
            })
        ]).start()
    }

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    const scaleStyles = {
        opacity: scale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        }),
        transform: [
            {
            scale: scale
        }
        ]
    }

  return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity styles={styles.container} onPress={onPress}>  
        <Animated.View style={[styles.button, translateStyles]}>
        <Animated.View style={[styles.iconContainer, scaleStyles]}/>
         <Material name={item.icon} color={accessibilityState.selected ? 'rgb(255, 204, 0)' : 'black'} size={35}/>
         
        </Animated.View>
        <Animated.Text style={[styles.title, {opacity: scale}]}>
            {item.title}
         </Animated.Text>
    </TouchableOpacity>
        </View> 
  )
}

export default TabButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        alignSelf: 'stretch'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: 'rgb(255, 204, 0)',
        backgroundColor: 'rgb(255, 204, 0)',
        overflow: 'hidden'
    },
    iconContainer: {
        flex: 1, 
        width: 50, 
        height: 50, 
        borderRadius: 100, 
        position: 'absolute', 
        backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems:'center'
    },
    title: {
        fontSize: 10,
        textAlign: 'center',
        color: 'black',
        position: 'absolute',
        left: 10,
        bottom: 10,
        fontWeight: 'bold'
    }
})