import { useContext } from "react"
import { FiltersContext } from "../context/FiltersContext"



export const useFilters = () => {
  
    const {state, dispatch} = useContext(FiltersContext);

    

    const setMinPrice = (value) => {
      dispatch({type: 'SET_MIN_PRICE', payload: value})
    };

    const setCategory = (selectedCategory) => {
      let dbCategory;

      switch (selectedCategory) {
        case 'Placas de Video':
          dbCategory = 'VGA';
          break;

        case 'Memorias Ram':
          dbCategory = 'RAM';
          break;
        
        case 'Monitores':
          dbCategory = 'MONITOR';
          break;
            
        case 'Mouses':
          dbCategory = 'MOUSE';
          break;

        case 'Teclados':
          dbCategory = 'KEYBOARD';
          break;
              
        case 'Coolers':
          dbCategory = 'COOLER';
          break;

        case 'Audio':
          dbCategory = 'AUDIO';
          break;
            
        case 'Sillones gamer':
          dbCategory = 'GAMER-CHAIR';
          break;

        case 'Procesadores':
          dbCategory = 'PROCESSOR';
          break;
            
        case 'Gabinetes':
          dbCategory = 'CASE';
          break; 
        
        case 'Fuentes':
          dbCategory = 'PWSUPPLY';
          break;
              
        case 'Placas madre':
          dbCategory = 'MOTHERBOARD';
          break; 

        case 'PC Completa':
          dbCategory = 'PC';
          break;
                
        case 'Todas':
          dbCategory = 'all';
          break;
        
        default:
          dbCategory = 'all';
          break;
      }

      dispatch({type: 'SET_CATEGORY', payload: dbCategory});
    };
    
      const prodFilter = (prod) => {
        return prod.filter(product => {
          return (
            product.price >= state.minPrice && (
            state.category === 'all' || 
            product.category === state.category
            )    
          )
        })
      } 
      return {prodFilter, setMinPrice, setCategory, state}
    }