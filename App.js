import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/providers/AuthProvider';
import StackAuthNavigator from './src/navigators/StackAuthNavigator';
import { FiltersProvider } from './src/context/FiltersContext';
import { CartProvider } from './src/context/CartContext';



export default function App() {
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
