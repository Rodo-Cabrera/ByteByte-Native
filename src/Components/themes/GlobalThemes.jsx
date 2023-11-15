import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 15
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
        textAlign: 'center',
        position: 'relative'
    },

    touchableBtn: {
        backgroundColor: 'rgb(255, 204, 0)',
        color: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginVertical: 5,
        width: '90%',
    },

    textBtn: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    }
      
})