import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import DropDown from '../main/dropDown/DropDown'

function MainScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#2F7EBF"}}>
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 22
    }
  })