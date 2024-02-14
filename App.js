import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/providers/AuthProvider';
import StackAuthNavigator from './src/navigators/StackAuthNavigator';
import { FiltersProvider } from './src/context/FiltersContext';
import { CartProvider } from './src/context/CartContext';
import * as Updates from 'expo-updates'
import { useEffect } from 'react';



export default function App() {

  useEffect(() => {
    onFetchUpdateAsync()
  }, []);


  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvaiable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync()
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`)
    }
  }


  return (
      <AuthProvider>
        <FiltersProvider>
          <CartProvider>
            <NavigationContainer>
              <StackAuthNavigator />
            </NavigationContainer>
          </CartProvider>
        </FiltersProvider>
      </AuthProvider>
  );
}
