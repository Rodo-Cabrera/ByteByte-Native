import React, { useState } from 'react'
import { FlatList, Image, RefreshControl, View} from 'react-native'
import { searchData } from '../../data/searchData'
import ProductList from './ProductList';
import { ScrollView } from 'react-native-gesture-handler';
import ShopHeader from './filters/ShopHeader';
import { useFilters } from '../../hooks/useFilters';
import Cart from './cart/Cart';
import CartButton from './cart/CartButton';
import { useCart } from '../../hooks/useCart';



const ShopScreen = () => {

    const [refreshing, setRefreshing] = useState(false);
    const {filters} = useFilters();

    const [cartButton, setCartButton] = useState(false);

    const {cart} = useCart()

    const onRefresh = () => {
        setRefreshing(true);

    

        setTimeout(() => {
            console.log('Refreshing xd');
            setRefreshing(false)
        }, 3000)
    }


    const renderBanner = (item) => {
        return (
            <View style={{
                width: 380,
                padding: 8,
                borderWidth: 2,
                borderColor: 'white'
            }}>
                <Image
                style={{width: '100%', height:200}}
                source={{uri: item.photo}}
                />
            </View>           
        )
    };

   


  return (

    <>
    <ScrollView>
    {/* <View>
        <FlatList
        refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }
        data={searchData}
        renderItem={({item}) => renderBanner(item)}
        keyExtractor={item => item.id}
        horizontal={true}
        />
    </View> */}
        <View>
            <ShopHeader />        
        </View>
        <View>
            <ProductList refreshing={filters}/>   
        </View>
    </ScrollView>
    {cart && Object.keys(cart).length > 0 ? (
    <View>
    <CartButton setCartButton={setCartButton}/>
    </View>   
    ) : <></>
    }
    <Cart cartButton={cartButton} setCartButton={setCartButton}/>
    </>
  )
}

export default ShopScreen