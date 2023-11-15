import React from 'react'
import Slider from '@react-native-community/slider'
import { useState } from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useFilters } from '../../../hooks/useFilters'

const Filters = () => {



    const {setFilters, filters, setCategory, setMinPrice} = useFilters()
    const [priceRange, setPriceRange] = useState(0);
    const [cat, setCat] = useState('');
    const [handleCategory, setHandleCategory] = useState('')

    const handleSliderChange = (value) => {
        setPriceRange(value.toFixed(0))
        // setFilters(prevState => ({
        //     ...prevState,
        //     minPrice: priceRange
        // }))
        setMinPrice(Number(value.toFixed(0)))
    }
    const categories = ["Todas", "Placas de Video", "Memorias Ram", "Monitores", "Mouses", "Teclados", "Coolers", "Audio", "Sillones gamer", "Procesadores", "Gabinetes", "Fuentes", "Placas madre", "PC Completa"]


    // const handleCatChange = () => {
    //     setHandleCategory(
    //         cat == "Placas de Video" ? 'VGA' :
    //         cat == "Memorias Ram" ? 'RAM' :
    //         cat == "Notebooks" ? 'notebook' :
    //         cat == "Monitores" ? 'display' :
    //         cat == "Todas" ? 'all' : 'all' 
    //     )
    // }

    const handleCatChange = (selectedItem) => {
       setCat(selectedItem);
       setCategory(selectedItem)
    }


  return (
    <View style={{flexDirection:'row'}}>
        <View>
            <Text>
                {priceRange}
            </Text>
            <Slider 
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5000}
                minimumTrackTintColor='green'
                maximumTrackTintColor='red'
                onValueChange={handleSliderChange}
                />
        </View>
        <View>
            <SelectDropdown 
            data={categories}
            onSelect={handleCatChange}
            />
        </View>
    </View>
  )
}

export default Filters