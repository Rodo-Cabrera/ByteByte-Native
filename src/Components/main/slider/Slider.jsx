import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, Image, ScrollView, Dimensions, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { data } from './data'

const {width} = Dimensions.get('window')


function Slider() {

const images = data

const animatedValues = {
    topAnimation: useRef(new Animated.Value(-50)).current,
    bottomAnimation: useRef(new Animated.Value(50)).current,
    scale: useRef(new Animated.Value(0)).current
}

const {topAnimation, bottomAnimation, scale} = animatedValues;
const [active, setActive] = useState(0);

useEffect(() => {
    topAnimation.setValue(-50);
    bottomAnimation.setValue(50);
    scale.setValue(0);
    handleAnimated()
}, [active])

const handleAnimated = () => {
    Animated.parallel([
        Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            delay: 0.95,
            useNativeDriver: true
        }),
        Animated.timing(topAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }),
        Animated.timing(bottomAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        })
    ]).start()
}


const onSlide = ({nativeEvent}) => {
    let slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    setActive(slide === images.length ? (slide - 1) : slide)
}

const animatedTopStyles = {
    transform: [
        {
            translateY: topAnimation
        }
    ]   
};

const animatedBotStyles = {
    transform: [
        {
            translateY: bottomAnimation
        }
    ]
};

const animatedImage = {
    transform: [
        {
            scale
        }
    ]
}

  return (
    
    <View style={styles.container}>
      <ScrollView
      style={{flex: 1, alignSelf: 'stretch'}}
      pagingEnabled
      onMomentumScrollEnd={onSlide}
      showsHorizontalScrollIndicator={false}
      horizontal
      >
        {
            images.map((image, i) => 
                <View style={{flex: 1}} key={image.id}>
                    <View style={{flex: 1}} />
                    <Animated.View style={[styles.headerContent, animatedTopStyles, {opacity: active === i ? 1 : 0}]}>
                        <Text style={styles.headerTitle}>{image.title}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.imageContent, animatedImage, {opacity: active === i ? 1 : 0}]}>
                        <Image 
                            style={{width: 200, height: 200, resizeMode: 'contain'}}
                            source={{uri: image.url}}
                            />
                    </Animated.View>
                    <Animated.View style={[styles.footerContent, animatedBotStyles, {opacity: active === i ? 1 : 0}]}>
                        <Text style={styles.footerSubtitle}>{image.subtitle}</Text>
                    </Animated.View>
                    <View style={{flex: 1}} />
                </View>
            )
        }
      </ScrollView>
      <View style={styles.paginationContent}>
        {
            images.map((image, i) => 
                <View style={[styles.paginationItem, {backgroundColor: i === active ? 'rgb(255, 204, 0)' : '#dadada', borderRadius: i === active ? 50 : 1.5}]} key={image.id} />
            )
        }
        <View style={{flex:1, alignSelf: 'stretch', alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'rgb(255, 204, 0)'}}>
                Ver más...
            </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    container: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    headerContent: {
        height: 'auto',
        width,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContent: {
        height: 200,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    footerContent: {
        height: 'auto',
        width,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#383838',
        fontWeight: 'bold'
    },
    footerSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#383838',
    },
    paginationContent: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        width
    },
    paginationItem: {
        width: 14,
        height: 14,
        backgroundColor: '#dadada',
        borderRadius: 1.5,
        marginRight: 10
    }
})