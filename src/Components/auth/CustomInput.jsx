import React, { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { globalStyles } from '../themes/GlobalThemes'; 

const CustomIconInput = ({placeholder, showPassword, showEyeButton, value, onChange, name, formik}) => {

    const [viewPw, setViewPw] = useState(true);
    const [icon, setIcon] = useState(showPassword ? 'eye' : 'eye-off');
    const [opacity, setOpacity] = useState('0.3')

    const handleViewPw = () => {
        if (viewPw) {        
            setViewPw(false);
            setIcon('eye');
            setOpacity('1')
        } else {
            setViewPw(true)
            setIcon('eye-off')
            setOpacity('0.3')
        }
    }


  return (
    <View style={styles.container}>
        {showEyeButton && (
        <Pressable 
        onPress={() => handleViewPw()}
        style={styles.iconPass}
        >
        <Feather 
        name={icon} 
        size={20} 
        color={`rgba(255,255,255, ${opacity})`} 
        />
        </Pressable>
        )}
       
        <TextInput 
                style={globalStyles.inputText}
                placeholder={placeholder}
                placeholderTextColor={`rgba(255,255,255, 0.3)`}
                secureTextEntry={viewPw}
                onChangeText={(value) => formik.setFieldValue(name, value)}
                name={name}
                />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    inputText: {
        borderWidth: 2,
        borderColor: '#f2058b',
        borderRadius: 50,
        paddingVertical: 5,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 15,
        color: 'white'
    },
    iconPass: {
        position: 'absolute',
        right: 30,
        zIndex: 1
    }
})

export default CustomIconInput

