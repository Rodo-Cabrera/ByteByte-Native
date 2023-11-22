import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useCart } from '../../hooks/useCart';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const ProductCard = ({img, icon, category, tittle, price, description, prod}) => {

    const [count, setCount] = useState(1);

    const { addToCart, cart, clearCart, removeFromCart } = useCart();


    
    const handleAddToCart = () => {
        const productToAdd = {
            ...prod,
            quantity: count
        }
        addToCart(productToAdd);
    };
    
    const checkProdInCart = (product) => {
        if (cart && Object.keys(cart).length > 0) {
          return Object.values(cart).some(item => item._id === product._id);
        }
        return false;
      };

    const isProductInCart = checkProdInCart(prod);

  return (
    <View style={styles.container}>
        <View>
            <Image source={{uri: icon}} style={styles.img}/>
        </View>
        <View style={styles.infoContainer}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            {tittle}
        </Text>
        <Text style={{textAlign: 'center'}}>
            {category}
        </Text>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <AntDesign name='minuscircleo' size={24} color={'black'} onPress={() => setCount(count -1)}/>
            <Text>{count}</Text>
            <AntDesign name='pluscircleo' size={24} color={'black'} onPress={() => setCount(count +1)}/>
            </View>
            <Text>${price * count}</Text>
        </View>
        <Text numberOfLines={2} style={{fontSize: 12, textAlign: 'center'}}>
            {description}
        </Text>
            {isProductInCart ? 
            <View  style={styles.cartButton}>
            <TouchableOpacity  style={styles.cartContainer}  onPress={() => clearCart(prod)}>
                    <MaterialCommunityIcons name="cart-off" size={24} color="red" />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.cartContainer}>
                <MaterialCommunityIcons name="cart-plus" size={24} color="greenyellow" />
            </TouchableOpacity>

                    <Text> </Text>
                
            <TouchableOpacity style={styles.cartContainer} onPress={() => removeFromCart(prod)}>
                   <MaterialCommunityIcons name="cart-minus" size={24}color="crimson" />
            </TouchableOpacity>
            </View>
            </View>
            :
            <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                <View  style={[styles.cartContainer, {flexDirection: 'row'}]}>
                    <AntDesign name='shoppingcart' size={24} color={'white'}/>
                    <Text style={{color: 'white', textAlign: 'center', padding: 5}}>Agregar al Carrito</Text>
                </View>
            </TouchableOpacity>
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        marginVertical: 10,
        alignItems:'center',
        paddingVertical: 10,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10
    },
    infoContainer:{
        gap: 10,
    },
    cartButton: {
        backgroundColor: 'black',
        borderRadius: 20,
        width: 300,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5
    },
    cartContainer: {
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'center'
    }
})


export default ProductCard