import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../themes/GlobalThemes' 
import CustomIconInput from './CustomInput'
import { eShopApiUrl } from '../../config/eShopApi'
import { userEndpoints } from '../../config/endPoints'

const RegisterScreen = () => {

    const [formData, setFormData] = useState(initFormValues)

    const initFormValues = () => {
        return{ 
            email: '',
            email2: '',
            name: '',
            lastName: '',
            age: '',
            password: '',
            password2: ''
        }
    };

    const handleChange = (e, type) => {
        setFormData({
            ...formData, 
            [type]: e.nativeEvent.text
        })
    }

    const onSend = async () => {
        if (formData.password !== formData.password2) {
            return console.log('No coinside la contraceña xd');
        };
        try {
            const {data} = await eShopApiUrl.post(userEndpoints.register, formData);
            setFormData('')
            return (
                Alert.alert(
                    `Bienvenid@, ${data.name}`,
                    `Ahora puedes disfrutar de nuestros servicios!`
                )
            )
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <ScrollView style={globalStyles.container}>
        <View>
            <Image 
                style={styles.logo}
                source={require('../../assets/eShop.png')}
                />
                <View>
                    <TextInput 
                    style={globalStyles.inputText}
                    placeholder='Email'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChange={(e) => handleChange(e, 'email')}
                    />
                    <TextInput 
                    style={globalStyles.inputText}
                    placeholder='Repetir Email'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChange={(e) => handleChange(e, 'email2')}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    <TextInput 
                    style={[globalStyles.inputText, {flex: 1}]}
                    placeholder='Nombre'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChange={(e) => handleChange(e, 'name')}
                    />
                    <TextInput 
                    style={[globalStyles.inputText, {flex: 1}]}
                    placeholder='Apellido'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChange={(e) => handleChange(e, 'lastName')}
                    />
                    <TextInput 
                    style={[globalStyles.inputText, {flex: 0.5}]}
                    placeholder='Edad'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChange={(e) => handleChange(e, 'age')}
                    />
                    </View>
                    
                    <CustomIconInput  style={{flex: 1}} placeholder={'Contraseña'} onChange={(e) => handleChange(e, 'password')}/>
                    <CustomIconInput  style={{flex: 1}} placeholder={'Repetir contraseña'} showEyeButton={true} onChange={(e) => handleChange(e, 'password2')}/>
                    
                    <View>
                    <TouchableOpacity
                        style={globalStyles.touchableBtn}
                        onPress={onSend}
                        >
                        <Text style={styles.textBtn}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
})

export default RegisterScreen