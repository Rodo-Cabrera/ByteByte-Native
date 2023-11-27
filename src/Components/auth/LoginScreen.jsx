import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import CustomIconInput from './CustomInput';
import { globalStyles } from '../themes/GlobalThemes'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({navigation}) => {


    const [formData, setFormData] = useState({})
    const { login, state } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('El formato del email es incorrecto.')
            .required('Este campo es obligatorio'),
            password: Yup.string()
            .required('Este campo es obligatorio')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
        }),
        onSubmit: (values) => {
            isLogin(values);
        }
    })

    const isLogin = () => {
        console.log('logiao');
        login(
            formik.values.email,
            formik.values.password
        )
    }


    const onChange = (e, type) => {
        setFormData({
            ...formData, 
            [type]: e.nativeEvent.text
        })
    }

  return (
    <>
    <ScrollView style={{
        flex:1,
        backgroundColor: 'black',
        padding: 15,
    }}>
        <View>
            <Image 
                style={styles.logo}
                source={require('../../assets/eShop.png')}
                />
        </View>
        <View>
            <TextInput 
            style={globalStyles.inputText}
            placeholder='Email'
            placeholderTextColor={'rgba(255,255,255, 0.3)'}
            onChangeText={(value) => formik.setFieldValue('email', value)}
            name='email'
            />
            {formik.errors.email && 
            <Text style={{
                color: 'red',
                textAlign: 'center',
                fontSize: 10,
                
            }}>
                {formik.errors.email}
            </Text>
            }
            <CustomIconInput 
            placeholder='Password'
            showEyeButton={true}
            onChange={(e) => onChange(e, 'password')}
            name={'password'}
            formik={formik}
            />
            {formik.errors.password && 
            <Text style={{
                color: 'red',
                textAlign: 'center',
                fontSize: 10,
                
            }}>
                {formik.errors.password}
            </Text>
            }
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity
                style={globalStyles.touchableBtn}
                onPress={formik.handleSubmit}
                >
                <Text style={styles.textBtn}>
                    LOG IN
                </Text>
            </TouchableOpacity>

            <View style={styles.regBtn}>
                <TouchableOpacity
                    style={[globalStyles.touchableBtn, {flexDirection: 'row', backgroundColor:'red'}]}
                    onPress={() => {}}
                    >
                    <AntDesign name="google" size={24} color="white" style={{flex: 1}} />
                    <Text style={[styles.regBtnText, {flex: 10, textAlign: 'center'}]}>
                        Ingresar con Google
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[globalStyles.touchableBtn, {flexDirection: 'row', backgroundColor:'blue'}]}
                    onPress={() => {}}
                    >
                    <FontAwesome5 name="facebook-f" size={24} color="white" style={{flex: 1}} />
                    <Text style={[styles.regBtnText, {flex: 10, textAlign: 'center'}]}>
                        Ingrersar con Facebook
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{
                color:'#fff',
                textAlign: 'center'
            }}>
                No tienes cuenta?
            </Text>
            <TouchableOpacity
                style={globalStyles.touchableBtn}
                onPress={() => navigation.navigate('Register')}
                >
                <Text style={styles.textBtn}>
                    Registro Tradicional
                </Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
</>
  )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical:20
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
    textBtn: {
        fontSize: 15,
        color: '#000',
    },
    regBtn: {
        marginVertical: 30
    },
    regBtnText: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 15,
    }
})

export default LoginScreen

