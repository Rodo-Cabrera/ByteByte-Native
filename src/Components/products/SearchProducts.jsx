import React, { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import { CustomItemSearch } from './CustomItemSearch';
import { globalStyles } from '../themes/GlobalThemes';
import { getAllProd } from '../../config/api';
import { useAuth } from '../../hooks/useAuth';

const SearchProducts = () => {

  const [productList, setProductList] = useState([]);
  const [filteredProd, setFilteredProd] = useState([]);
  const [search, setSearch] = useState('')
  const {token} = useAuth()
  

  useEffect(() => {
  const resp = async () => {
    if (token) {
      try {    
       const response = await getAllProd(token);
       setProductList(response.data);
       setFilteredProd(response.data)
      } catch (error) {
       console.log(error);
      }     
    }
  };
    resp();
  }, [token]);


  const loadMore = async () => {
    try {
      if (productList.length < 5) {
        const response = await getAllProd(token);
        const newData = response.data.slice(productList.length, productList.length +9);
        setProductList([...productList, ...newData]);
        setFilteredProd([...filteredProd, ...newData])
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
      const lowerCase = search.toLowerCase();
      const filteredData = productList.filter((product) => {
      return product.tittle.toLowerCase().includes(lowerCase) && !product.disabled
      })
      setFilteredProd(filteredData)
  }
  

  return (
    <View style={globalStyles.container}>
        <View>
        <TextInput 
        placeholder='Buscar'
        style={globalStyles.inputText}
        value={search}
        onChangeText={(text) => {
          setSearch(text)
          handleSearch(text)
        }}
        />
        </View>
        <View style={{height: '90%'}}>
        <FlatList 
        data={search.length > 0 ? filteredProd : productList}
        renderItem={({item}) => <CustomItemSearch item={item} />}
        keyExtractor={(item, index) => `${item._id}_${index}`}
        onEndReached={loadMore}
        />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    color: 'white',
    borderRadius: 50,
  }
})

export default SearchProducts