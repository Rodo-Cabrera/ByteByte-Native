import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup'
import Constants from 'expo-constants'
import { globalStyles } from '../themes/GlobalThemes'
import { useAuth } from '../../hooks/useAuth';

const ContactScreen = () => {

    const initFormValues = () => {
        return{
            name: '',
            lastName: '',
            email: '',
            message: ''
        }
    }

    const {actualUser} = useAuth()

    const [formData, setFormData] = useState(initFormValues)

    const formik = useFormik({
        initialValues: formData,
        validationSchema: Yup.object({
            name: Yup.string()
            .required('Este campo es obligatorio')
            .max(15, 'Caracteres máximos: 15')
            .min(3, 'Caracteres minimos: 3')
            .matches(/^[a-zA-Z\s]+$/, 'No se permiten caracteres especiales en el nombre (a-Z)'),
            lastName: Yup.string()
            .required('Este campo es obligatorio')
            .max(20, 'Caracteres máximos: 20')
            .min(2, 'Caracteres mínimos: 2')
            .matches(/^[a-zA-Z\s]+$/, 'No se permiten caracteres especiales en el apellido (a-Z)'),
            email: Yup.string()
            .email('El formato del Email es incorrecto')
            .required('Debes poner un Email'),
            message: Yup.string()
            .required('Debes enviar un mensaje')
            .min(100, 'El mensaje debe contener al menos 100 caracteres')
            .max(1000, 'La descripción de tu problema debe ser más breve (hasta 1000 caracteres)')
        }),
        onSubmit: (values) => {
            onSend(values)
        }
    });


    const refForm = useRef()

    const onSend = async () => {

        const serviceId = Constants.expoConfig.extra.emailjs_id;
        const templateId = Constants.expoConfig.extra.emailjs_template_id;
        const apiKey = Constants.expoConfig.extra.emailjs_public_key;
        
        setTimeout(()=> {
          emailjs.sendForm(serviceId, templateId, refForm.current, apiKey)
            .then(result => console.log(result.text))
            .catch(error => console.error(error))
        }, 5000);
      };

  return (
    <ScrollView style={globalStyles.container}>
    <View style={{}}>
        <Image 
        style={[styles.logo, {marginBottom: 20}]}
        source={require('../../assets/eShop.png')}
        />
        <Text style={{color:'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Nombre</Text>
        <TextInput
        style={globalStyles.inputText}
        placeholder={actualUser.name}
        placeholderTextColor={'rgba(255,255,255, 0.3)'}
        name='name'
        onChangeText={(value) => formik.setFieldValue('name', value)}
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
        <Text style={{color:'white', textAlign: 'center', fontSize: 18, marginTop: 20, fontWeight: 'bold'}}>Apellido</Text>
        <TextInput
        style={globalStyles.inputText}
        placeholder={actualUser.lastName}
        placeholderTextColor={'rgba(255,255,255, 0.3)'}
        name='lastName'
        onChangeText={(value) => formik.setFieldValue('lastName', value)}
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
        <Text style={{color:'white', textAlign: 'center', fontSize: 18, marginTop: 20, fontWeight: 'bold'}}>Email</Text>
        <TextInput
        style={globalStyles.inputText}
        placeholder={actualUser.email}
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
        }<Text style={{color:'white', textAlign: 'center', fontSize: 18, marginTop: 20, fontWeight: 'bold'}}>Descripción del problema</Text>
        <View>

        <TextInput
        style={[styles.inputText, {height: 120}]}
        placeholder='Describe tu problema'
        placeholderTextColor={'rgba(255,255,255, 0.3)'}
        name='message'
        multiline
        onBlur={formik.handleBlur('message')}
        onChangeText={(value) => formik.setFieldValue('message', value)}
        />
        {formik.errors.message && 
        <Text style={{
            color: 'red',
            textAlign: 'center',
            fontSize: 10,
        }}>
            {formik.errors.message}
        </Text>
        }
        <Text style={{ alignSelf: 'flex-end', color: `${formik.values.message.length <= 1000 ? 'rgba(255,255,255, 0.3)' : 'red'}`, marginBottom: 50 }}>{formik.values.message.length}/1000</Text>
        </View>
        <View>
            <TouchableOpacity
                style={[globalStyles.touchableBtn, {marginBottom: 50}]}
                onPress={formik.handleSubmit}
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Enviar
                </Text>
            </TouchableOpacity>
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
    },
    inputText: {
        borderWidth:  2,
        borderColor: 'rgb(255, 204, 0)',
        borderRadius: 40,
        fontSize: 15,
        color: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 12,
        marginVertical: 12,
        position: 'relative'
    },
})

export default ContactScreen