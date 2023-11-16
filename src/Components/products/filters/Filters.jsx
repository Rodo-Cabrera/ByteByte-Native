import React from 'react'
import Slider from '@react-native-community/slider'
import { useState } from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useFilters } from '../../../hooks/useFilters'

const Filters = () => {



    const {setCategory, setMinPrice, state} = useFilters()
    const [priceRange, setPriceRange] = useState(0);
    const [cat, setCat] = useState('');
    const [handleCategory, setHandleCategory] = useState('')

    const handleSliderChange = (value) => {
        setPriceRange(value.toFixed(0))
        setMinPrice(Number(value.toFixed(0)))
    }
    const categories = ["Todas", "Placas de Video", "Memorias Ram", "Monitores", "Mouses", "Teclados", "Coolers", "Audio", "Sillones gamer", "Procesadores", "Gabinetes", "Fuentes", "Placas madre", "PC Completa"]



    const handleCatChange = (selectedItem) => {
        console.log('Selected Category:', selectedItem);
        setCat(selectedItem);
        const categoryToSet = selectedItem === 'Todas' ? 'all' : selectedItem
        console.log('Category to set:', categoryToSet);
        setCategory(categoryToSet, () => {
            console.log('Category updated:', state);
        })
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