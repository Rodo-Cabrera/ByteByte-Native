import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet } from 'react-native'


const ProductCard = ({img, icon, category, tittle, price, description}) => {


    const [count, setCount] = useState(1);

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
        <TouchableOpacity style={styles.cartButton}>
            <View style={styles.cartContainer}>
            <AntDesign name='shoppingcart' size={24} color={'white'}/>
            <Text style={{color: 'white', textAlign: 'center', padding: 5}}>Agregar al Carrito</Text>
            </View>
        </TouchableOpacity>
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
        alignSelf: 'center'
    },
    cartContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'center'
    }
})


export default ProductCard