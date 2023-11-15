import { useEffect, useState } from "react";
import { Dimensions } from "react-native"


export const useDimensions = () => {

    const [screenDimensions, setScreenDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    const handleScreenChange = ({window}) => {
        setScreenDimensions({
            width: window.width,
            height: window.height
        })
    };

    useEffect(() => {
    
    Dimensions.addEventListener('change', handleScreenChange);
    return () => {
        Dimensions.removeEventListener('change', handleScreenChange)
    };
    
    }, [])
    

    return screenDimensions

}
