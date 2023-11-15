import React from 'react'
import { View, StyleSheet, Text, FlatList, Image, Dimensions, SafeAreaView, Animated, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const images = [
    {
      img:'https://picsum.photos/200/300',
      title: 'Home',
      to: 'Home'
    },
    {
        img:'https://picsum.photos/id/237/200/300',
        title: 'Productos destacados',
        to: 'Shop'
      },
      {
        img:'https://picsum.photos/id/238/200/300',
        title: 'Ingresar',
        to: 'Auth'
      },
      {
        img:'https://picsum.photos/id/239/200/300',
        title: 'Registrarse',
        to: 'Some'
      },

];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CONTAINER_SPACE = width * 0.7;
const SIDE_SPACE = (width - CONTAINER_SPACE) / 2;
const SPACE = 10;
const BACKDROP_HEIGHT = height * 0.5;

const BackDrop = ({scrollX}) => {


    return (
        <View style={
            ([{
            height: BACKDROP_HEIGHT,
            width,
            position: 'absolute',
            top: 0
        }],
        StyleSheet.absoluteFillObject
        )}>
            {images.map ((image, index) => {


            const inputRange = [
                (index - 1) * CONTAINER_SPACE,
                index * CONTAINER_SPACE,
                (index + 1) * CONTAINER_SPACE
            ];

            const outputRange = [0, 1, 0];

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange,
            });

                return (
                    <Animated.Image 
                    source={{uri: image.img}}
                    key={index}
                    blurRadius={3}
                    style={[{
                        height: BACKDROP_HEIGHT,
                        width,
                        position: 'absolute',
                        top: 0,
                        opacity: opacity
                    }]}
                    />
                )
            })}
            <LinearGradient 
            colors={['transparent', 'white']}
            style={{
                height: BACKDROP_HEIGHT,
                width,
                position: 'absolute',
                top: 0
            }}
            />
        </View>
    )
}



const Carousel = ({navigation}) => {


    const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
        <BackDrop scrollX={scrollX} />
        <Animated.FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingTop: 200,
            paddingHorizontal: SIDE_SPACE,
        
        }}
        decelerationRate={0}
        snapToInterval={CONTAINER_SPACE}
        scrollEventThrottle={16}
        onScroll={Animated.event(
            [{ nativeEvent: {contentOffset: {x: scrollX}} }],
            {useNativeDriver: true}
        )}
        data={images}
        keyExtractor={(item, index) => item.to}
        renderItem={({item, index}) => {

            const inputRange = [
                (index - 1) * CONTAINER_SPACE,
                index * CONTAINER_SPACE,
                (index + 1) * CONTAINER_SPACE
            ];

            const outputRange = [0, -50, 0];

            const translateY = scrollX.interpolate({
                inputRange,
                outputRange,
            });

            return (
                <Pressable
                onPress={() => navigation.navigate(item.to)}
                >
                <View style={{width: CONTAINER_SPACE}}>

                        <Animated.View style={{
                            marginHorizontal: SPACE,
                            padding: SPACE,
                            borderRadius: 34,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            transform: [{translateY}]
                        }}>
                            <Image 
                            source={{uri: item.img}}
                            style={styles.posterImg}
                            />
                            <Text style={styles.posterTitle}>
                                {item.title}
                            </Text>
                        </Animated.View>
                </View>
                </Pressable>
            )
        }}
        />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'centerr'
    },
    posterImg: {
        width: '100%',
        height: CONTAINER_SPACE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10
    },
    posterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default Carousel