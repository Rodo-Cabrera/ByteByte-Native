import React, {useState, useRef, useEffect} from 'react'
import { View, Animated, StyleSheet, FlatList, Text, TouchableWithoutFeedback, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { filtersData } from './data';

function DropDown() {


  const [data, setData] = useState(filtersData);

  const [dropDown, setDropDown] = useState({
    itemValue: null,
    itemLabel: null
  })

  const {itemValue, itemLabel} = dropDown

  const [text, setText] = useState('');
  const [toggle, setToggle] = useState(0);
  const [toggleLong, setToggleLong] = useState(0);

  const animation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current


  const handleAnimatedLong = () => {
    Animated.spring(scale, {
      toValue: toggleLong ? 1 : 0,
      friction: 5,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    handleAnimatedLong()
  }, [toggleLong])

  const handleAnimated = () => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    handleAnimated()
  }, [toggle])
  
  const handleInputChange = (text) => {
    if (text) {
      const temporal = filtersData.filter(item => {
        const itemData = item.label ? item.label.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      setData(temporal)
    } else setData(filtersData)
      setText(text)
  }

  const Item = ({value, label}) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={styles.item}
      >
        <View style={styles.titleContainer}>
        <Text style={{fontSize: 15, fontWeight: '300', color: '#383838'}}>
          {label}
        </Text>
        </View>
        <View style={styles.checkContainer}>
          <Material name={'check'} size={18} color={'green'}/>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    
      <View style={styles.dropDownContainer}>
        <TouchableWithoutFeedback>
            <View style={styles.button}>
              <View style={styles.leftIcon}>
                <Material name={'folder-outline'} size={18} color={'#2F7EBF'}/>
              </View>

              <View style={styles.titleBox}>
                <Text style={{fontSize: 14, color: '#383838', fontWeight: '300'}}>
                  Seleccionar categoría...
                </Text>
              </View>

              <View style={styles.arrowR}>
                <Material name={'chevron-right'} size={20} color={'#2F7EBF'}/>
                <View style={styles.circle}/>
              </View>
            </View>
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <View style={[styles.listContainer, {opacity: 1}]}>
            <View style={styles.searchBar}>
              <View style={styles.magnify}>
                <Material name={'magnify'} size={22} color={'#adadad'}/>
              </View>
              <TextInput 
              value={text}
              onChangeText={handleInputChange}
              style={styles.input}
              placeholder='Buscar elemento...'
              placeholderTextColor={'#adadad'}
              />
            </View>

            <View style={styles.list}>
              <FlatList 
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({item}) => <Item {...item} />}
              />
            </View>

          </View>
        </View>
      </View>
    
  )
}

export default DropDown

const styles = StyleSheet.create({
  dropDownContainer: {
    height: 'auto',
    alignSelf: 'stretch'
  },
  button: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1.8,
    borderColor: '#2F7EBF',
    borderRadius: 4,
    zIndex: 10
  },
  leftIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    zIndex: 10
  },
  titleBox: {
    position: 'absolute',
    left: 37,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 0,
    borderRadius: 8
  },
  arrowR: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    zIndex: 10
  },
  circle: {
    height: 35,
    width: 35,
    backgroundColor: 'rgba(64, 122, 195, 0.08)',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 0
  },
  container: {
    height: 215,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 50,
    borderRadius: 4,
    borderWidth: 1.8,
    borderColor: '#2F7EBF',
    paddingHorizontal: 8,
    paddingTop: 8,
    zIndex: 0
  },
  listContainer: {
    flex: 1
  },
  searchBar: {
    height: 43,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9'
  },
  magnify: {
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 8,
    fontWeight: '300',
    fontSize: 16
  },
  list: {
    flex: 1,
    alignSelf: 'stretch'
  },
  item: {
    height: 40,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 8
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  checkContainer: {
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})