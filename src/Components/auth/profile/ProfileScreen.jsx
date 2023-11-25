import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../../hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FloatingAlert from '../../alerts/FloatingAlert';

const ProfileScreen = () => {

  const {actualUser} = useAuth();

  const [buttonInfo, setButtonInfo] = useState({
    type: 1,
    title: '',
    action: Math.random().toString()
  });

  const {type, title, action} = buttonInfo;

  const handleAction = (type, title) => {
    setButtonInfo({
      type,
      title,
      action: Math.random().toString()
    })
  }

  return (
    <>
      <View style={styles.container}>
        <Image 
        source={{uri: actualUser.avatar}}
        style={styles.img}
        />
        {
          actualUser.role === 'owner' ? 
            <TouchableOpacity onPress={() => handleAction(1, 'Eres el dueño, bah, soy el dueño, de hecho. Quién más, sino?')}>
              <MaterialCommunityIcons name="crown-circle" size={50} color="white" />
            </TouchableOpacity>

          : actualUser.role === 'admin' ? 
            <TouchableOpacity onPress={() => handleAction(2, 'Eres uno de los Administradores de esta app')}>
             <MaterialCommunityIcons name="shield-crown" size={50} color="white" />
            </TouchableOpacity>
          :
           <TouchableOpacity onPress={() => handleAction(4, 'Eres usuario de nivel I.')}>
            <FontAwesome name="user" size={50} color="white" />
           </TouchableOpacity>
        }


        

          <Text style={styles.generalTxt}>{actualUser.role}</Text>
          <Text style={[styles.generalTxt, styles.name]}>{actualUser.name} {actualUser.lastName}</Text>
          <Text style={styles.generalTxt}>{actualUser.email}</Text>
          <Text style={styles.generalTxt}>{actualUser.disabled ? 'USUARIO DESABILITADO' : 'HABILITADO'}</Text>
      <FloatingAlert type={type} title={title} action={action}/>
      </View>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 30
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  generalTxt: {
    color:'rgb(255, 204, 0)',
  },
  name: {
    fontSize:30,
    fontWeight: 'bold'
  }
})

export default ProfileScreen