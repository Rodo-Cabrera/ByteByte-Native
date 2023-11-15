import React from 'react'
import {Text, View} from 'react-native'
import Carousel from './Carousel'

const HomeScreen = ({navigation}) => {


  return (
    <View>
        <Carousel navigation={navigation} />
    </View>
  )
}

export default HomeScreen