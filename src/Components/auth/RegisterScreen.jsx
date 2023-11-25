import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../themes/GlobalThemes' 
import CustomIconInput from './CustomInput'
import { eShopApiUrl } from '../../config/eShopApi'
import { userEndpoints } from '../../config/endPoints'
import { useFormik } from 'formik';
import * as Yup from 'yup'


const RegisterScreen = () => {


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

    const [formData, setFormData] = useState(initFormValues)


    const formik = useFormik({
        initialValues: formData,
        validationSchema: Yup.object({
            email: Yup.string()
            .email('El formato del email es incorrecto.')
            .required('Este campo es obligatorio'),
            email2: Yup.string()
            .email('El formato del email es incorrecto.')
            .required('Este campo es obligatorio')
            .oneOf([Yup.ref('email'), null], 'Los correos electrónicos no coinciden'),  
            name: Yup.string()
            .required('Este campo es obligatorio')
            .max(15, 'Caracteres máximos: 15')
            .min(4, 'Caracteres mínimos: 4'),
            lastName: Yup.string()
            .required('Este campo es obligatorio')
            .max(15, 'Caracteres máximos: 15')
            .min(4, 'Caracteres mínimos: 4'),
            age: Yup.number()
            .required('Este campo es obligatorio')
            .max(85, 'La edad máxima es de 85 años')
            .min(18, 'La edad mínima es de 18 años'),
            password: Yup.string()
            .required('Este campo es obligatorio')
            .min(6, 'La contraseña debe tener al menos 6 caracteres'),
            password2: Yup.string()
            .required('Este campo es obligatorio')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
        }),
        onSubmit: (values) => {
            onSend(values);
        }
    })

    const handleChange = (e, type) => {
        setFormData({
            ...formData, 
            [type]: e.nativeEvent.text
        })
    }

    const onSend = async () => {
        if (formik.values.password !== formik.values.password2) {
            return (
                Alert.alert(
                    `Las contraseñas no coinciden`,
                )
            );
        };
        try {
            const {data} = await eShopApiUrl.post(userEndpoints.register, formik.values);
            formik.resetForm();
            return (
                Alert.alert(
                    `Bienvenid@, ${data.name}`,
                    `Ahora puedes disfrutar de nuestros servicios!`
                )
            )
            
        } catch (error) {
            console.log(error);
            return (
                Alert.alert(
                    `${error.response.data.error[0].msg}`,
                )
            )
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
                    name='email'
                    onChangeText={(value) => formik.setFieldValue('email', value)}
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
                    <TextInput 
                    style={globalStyles.inputText}
                    placeholder='Repetir Email'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChangeText={(value) => formik.setFieldValue('email2', value)}
                    name='email2'
                    />
                    {formik.errors.email2 && 
                    <Text style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: 10,
                        
                    }}>
                        {formik.errors.email2}
                    </Text>
                    }
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    <View>
                    <TextInput 
                    style={[globalStyles.inputText, {flex: 1}]}
                    placeholder='Nombre'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChangeText={(value) => formik.setFieldValue('name', value)}
                    name='name'
                    />
                    {formik.errors.name && 
                    <Text style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: 10,
                        
                    }}>
                        {formik.errors.name}
                    </Text>
                    }
                    </View>
                    <View>
                    <TextInput 
                    style={[globalStyles.inputText, {flex: 1}]}
                    placeholder='Apellido'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChangeText={(value) => formik.setFieldValue('lastName', value)}
                    name='lastName'
                    />
                    {formik.errors.lastName && 
                    <Text style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: 10,
                        
                    }}>
                        {formik.errors.lastName}
                    </Text>
                    }
                    </View>
                    <View>
                    <TextInput 
                    style={[globalStyles.inputText, {flex: 0.5}]}
                    placeholder='Edad'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    onChangeText={(value) => formik.setFieldValue('age', value)}
                    name='age'
                    />
                    {formik.errors.age && 
                    <Text style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: 10,
                        
                    }}>
                        {formik.errors.age}
                    </Text>
                    }
                    </View>
                    </View>
                    
                    <CustomIconInput  style={{flex: 1}} placeholder={'Contraseña'} onChange={(e) => handleChange(e, 'password')} formik={formik} name='password'/>
                        {formik.errors.password && 
                        <Text style={{
                            color: 'red',
                            textAlign: 'center',
                            fontSize: 10,
                            
                        }}>
                            {formik.errors.password}
                        </Text>
                        }
                    <CustomIconInput  style={{flex: 1}} placeholder={'Repetir contraseña'} showEyeButton={true} onChange={(e) => handleChange(e, 'password2')} formik={formik} name='password2'/>
                    {formik.errors.password2 && 
                        <Text style={{
                            color: 'red',
                            textAlign: 'center',
                            fontSize: 10,
                            
                        }}>
                            {formik.errors.password2}
                        </Text>
                        }
                    <View>
                    <TouchableOpacity
                        style={globalStyles.touchableBtn}
                        onPress={formik.handleSubmit}
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