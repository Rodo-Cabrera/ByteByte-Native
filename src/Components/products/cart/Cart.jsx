import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Modal, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import { useAuth } from '../../../hooks/useAuth'
import { useCart } from '../../../hooks/useCart'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native'


const CartItem = ({title, price, icon, quantity, addToCart, removeFromCart}) => {
    return (
      <>
        <View style={styles.cardContainer}>
          <Image source={{ uri: icon }} style={styles.prodImg} />
          <View style={styles.infoContainer}>
            <Text style={styles.prodTitle}>{title}</Text>
            <Text style={styles.prodDesc}>Precio unitario: ${price}</Text>
            <Text style={styles.prodDesc}>
              Cantidades disponibles: {quantity}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.prodFooter}>
            <View style={styles.cartButton}>
              <TouchableOpacity onPress={addToCart}>
                <MaterialCommunityIcons
                  name="cart-plus"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{textAlign: 'center', marginHorizontal: 5, fontSize: 12, backgroundColor: 'red', padding: 5, borderRadius: 50}}>{quantity}</Text>
              <TouchableOpacity onPress={removeFromCart}>
                <MaterialCommunityIcons
                  name="cart-minus"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="cart-off" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
}




const Cart = ({cartButton, setCartButton}) => {

    const {actualUser} = useAuth();
    const {cart, clearCart, addToCart, removeFromCart} = useCart();

    console.log('carrito:', cart);

    const cartItemsArray = Object.values(cart);

  return (
    <View>         
        <Modal 
            animationType='slide'
            visible={cartButton}
            transparent={true}
            hardwareAccelerated={true}
        >
            
            <View style={styles.container}>
                <View style={styles.modalBox}>
                    <View style={{alignItems: 'center'}}>
                        <AntDesign name='shoppingcart' size={24} color={'black'}/>
                        <Text>
                            Carrito de compras de {actualUser.name}
                        </Text>
                    </View>
                    {cart && Object.keys(cart).length > 0 ? (                   
                        <FlatList
                        data={cartItemsArray}
                        renderItem={({ item }) => (
                          <CartItem
                            title={item.tittle}
                            price={item.price}
                            icon={item.icon}
                            quantity={item.quantity}
                            addToCart={() => addToCart(item)}
                            removeFromCart={() => removeFromCart(item)}
                          />
                        )}
                        keyExtractor={(item) => item._id}
                      />
                    ) : (
                        <View>
                            <Text>No tienes productos en tu carrito</Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={() => setCartButton(false)} 
                    style={
                        {backgroundColor: 'black', 
                        padding: 5,
                        borderRadius: 14,
                        margin: 10,
                        width: '100%',
                        alignItems: 'center'
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            Cerrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 20,
        padding: 20,
        borderRadius: 15,
        shadowColor: 'black',
        elevation:8,
        shadowOffset: {
            width: 5,
            height: 5
        }
    },
    cardContainer: {
        margin: 10,
        width: 300,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(255, 204, 0, 0.4)',
        padding: 10,
        borderRadius: 10,
        
    },
    prodImg: {
        flex: 1,
        width: 50,
        height: 50,
    },
    infoContainer:{
        flex: 4
    },  
    prodFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 204, 0, 0.6)',
        padding:5,
        width: 300,
        alignSelf: 'center',

    },
    prodTitle: {
       fontSize: 10,
       fontWeight: 'bold',
       textAlign: 'center' 
    },
    prodDesc: {
        fontSize: 8,
        textAlign: 'center'
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Cart