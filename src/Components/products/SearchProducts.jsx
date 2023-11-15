import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native';
import {searchData} from '../../data/searchData'
import { CustomItemSearch } from './CustomItemSearch';
import { globalStyles } from '../themes/GlobalThemes';
import CustomSearchInput from './CustomSearchInput';

const SearchProducts = () => {

  const [productList, setProductList] = useState();

  useEffect(() => {
    const arrData = searchData.filter((data) => data.id <= 9)
    setProductList(arrData)
  }, [])
  
  const loadMore = () => {
    const newArrData = [];
    for(let i = 0; i < 9; i++){
      newArrData[i] = searchData[productList.length + i]
    }
    if (productList.length < 26) {
      setProductList([...productList, ...newArrData])
    }
  }

  return (
    <View style={globalStyles.container}>
        <View>
        <CustomSearchInput />
        </View>
        <FlatList 
        data={productList}
        renderItem={({item}) => <CustomItemSearch item={item} />}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        />
    </View>
  )
}

export default SearchProducts