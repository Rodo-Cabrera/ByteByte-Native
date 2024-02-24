import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import DropDown from '../main/dropDown/DropDown'
import Slider from '../main/slider/Slider'

function MainScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <Slider />   
        <View style={styles.container}>
          <DropDown />
        </View>
      </SafeAreaView>
  )
}

export default MainScreen

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 22
    },
  })