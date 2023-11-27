import React from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native'
import { View } from 'react-native'

  

  const ProductModal = ({setProdDetail, prodDetail}) => {

    const renderBanner = (item) => {


      return (
          <View style={{
              padding: 8,
              borderWidth: 2,
              borderColor: 'white',
          }}>
              <Image
              style={{width: 200, height:200, borderRadius: 10, borderColor: 'black', borderWidth: 2}}
              source={{uri: item}}
              resizeMode='contain'
              />
          </View>           
      )
  };


  return (
    <View>
        <Modal
        animationType='fade'
        visible={!!prodDetail}
        transparent={true}
        hardwareAccelerated={true}
        >
            <View style={styles.container}>

              <View style={styles.modalBox}>


                <View>
                  <Image 
                  source={{uri: prodDetail?.icon}}
                  style={styles.icon}
                  
                  />
                </View>
                    <Text style={{fontSize: 15, fontWeight: 'bold', top: -20}}>
                      {prodDetail?.tittle}
                    </Text>
                
                <View style={{width: '100%'}}>
                  <FlatList                
                  data={prodDetail?.img}
                  renderItem={({item}) => renderBanner(item)}
                  keyExtractor={item => item._id}
                  horizontal={true}
                  />
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                      {prodDetail?.category}
                    </Text>
                  </View> 
                  <View>
                    <Text style={{textAlign: 'justify', fontSize: 12}}>
                      {prodDetail?.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={{marginVertical: 10}}>
                     Precio unitario: ${prodDetail?.price}
                    </Text>
                  </View>
                  {prodDetail?.spotlight === true && 
                    <Text>Este es uno de nuestros productos destacados!</Text>
                  }
              
                    <TouchableOpacity onPress={() => setProdDetail(false)} 
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
};

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
    },
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 40,
  },
  icon: {
    width: 60, 
    height: 60,
    alignSelf:'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 40,
    top: -50,
    backgroundColor: 'white'
  },
})

export default ProductModal