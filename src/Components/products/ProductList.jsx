import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllProd, getProdByCategory } from '../../config/api';
import { FlatList } from 'react-native';
import ProductCard from './ProductCard';
import { useFilters } from '../../hooks/useFilters';


const ProductList = ({refreshing, setProdDetail}) => {

    const {token} = useAuth()
    const [prod, setProd] = useState([]);
    const {prodFilter, state} = useFilters();

    const {category} = state
    console.log(category);

    const resp = async () => {
        if (token) {
          try {

          let response;
            if (category === 'all') {            
            response = await getAllProd(token);
            } else {
              response = await getProdByCategory(token, category)
            }
            setProd(response.data)
          } catch (error) {
           console.log(error);
          }     
        }
      };
      useEffect(() => {
        resp();
      }, [refreshing, state]);


  return (
    <FlatList 
    data={prodFilter(prod)}
    keyExtractor={(item) => item._id}
    scrollEnabled
    renderItem={({item}) => (     
      <ProductCard {...item} prod={item} setProdDetail={() => setProdDetail(item)}/>
    )}
    contentContainerStyle={{paddingHorizontal: 15}}
    />
  )
}

export default ProductList