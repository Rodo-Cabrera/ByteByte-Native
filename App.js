import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/providers/AuthProvider';
import StackAuthNavigator from './src/navigators/StackAuthNavigator';
import { FiltersProvider } from './src/context/FiltersContext';



export default function App() {
  return (
      <AuthProvider>
        <FiltersProvider>
          <NavigationContainer>
            <StackAuthNavigator />
          </NavigationContainer>
        </FiltersProvider>
      </AuthProvider>
  );
}
