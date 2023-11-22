import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CartButton = ({setCartButton}) => {
  return (
    <View style={styles.cartFloatContainer}>
        <TouchableOpacity style={styles.cartIcon} onPress={() => setCartButton(true)}>
        <MaterialCommunityIcons name="cart-heart" size={30} color="black" />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    cartFloatContainer: {
        width: 50,
        height: 50,
        position: 'absolute',
        backgroundColor: 'rgb(255, 204, 0)',
        borderRadius: 60,
        alignItems:'center',
        bottom: 50,
        right: 10
    },
    cartIcon: {
        bottom: -10
    }
})

export default CartButton