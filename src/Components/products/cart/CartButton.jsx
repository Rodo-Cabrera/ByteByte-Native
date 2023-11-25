import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../../../hooks/useCart';

const CartButton = ({setCartButton}) => {

  const animation = useRef(new Animated.Value(0)).current;
  const {cart} = useCart()

  useEffect(() => {
      if (Object.keys(cart).length > 0) {     
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start()
      } else {
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start()
      }  
  }, [cart])
  

 


  return (
    <Animated.View style={[styles.cartFloatContainer, {transform: [{scale: animation}]}]}>
        <TouchableOpacity style={styles.cartIcon} onPress={() => setCartButton(true)}>
        <MaterialCommunityIcons name="cart-heart" size={30} color="black" />
        </TouchableOpacity>
    </Animated.View>
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
        right: 10,
    },
    cartIcon: {
        bottom: -10
    }
})

export default CartButton