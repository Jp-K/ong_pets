//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PocketBase from 'pocketbase';
import Login from './screens/Login';
//import StyledText from "./components/StyledText";
//import ItalicText from "./components/ItalicText";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {

  const pb = new PocketBase('http://192.168.1.9:8090');

  pb.autoCancellation(false);

  const Stack = createNativeStackNavigator();

  // @ts-ignore
  const LoginScreen = ({navigation}) => {

    const handleLogin = async (username: string, password: string) => {

      await pb.collection('users').authWithPassword(
        username,
        password,
      ).then((data) => {
        if (pb.authStore.isValid) {
          navigation.navigate('logged', {name: username})
        }
      }).catch((err) => {
        console.log(err);
      });
    };

    return (
      <View style={styles.container}>
        <Login onLogin={handleLogin} />
      </View>
    );
  }
  // @ts-ignore
  const LoggedScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Home" 
      >
        <Stack.Screen
            name="Home"
            component={LoginScreen}
          />
        <Stack.Screen
            name="logged"
            component={LoggedScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
