import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllProd } from '../../config/api';
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import ProductCard from './ProductCard';


const ProductList = ({refreshing, prodFilter}) => {

    const {token} = useAuth()
    const [prod, setProd] = useState([]);

  

    const resp = async () => {
        if (token) {
          try {
           await getAllProd(token).then((response) => {
             setProd(response.data);
           });
          } catch (error) {
           console.log(error);
          }     
        }
      };
 
      useEffect(() => {
        resp();
      }, [refreshing]);


  return (
    <FlatList 
    data={prodFilter(prod)}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => (     
      <ProductCard {...item} />
    )}
    contentContainerStyle={{paddingHorizontal: 15}}
    />
  )
}

export default ProductList