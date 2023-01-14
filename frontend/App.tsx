//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PocketBase from 'pocketbase';
import Login from './screens/Login';
//import StyledText from "./components/StyledText";
//import ItalicText from "./components/ItalicText";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

export default function App() {

  const pb = new PocketBase('http://192.168.1.11:8090');

  pb.autoCancellation(false);

  const Stack = createNativeStackNavigator();

  // @ts-ignore
  const LoginScreen = ({navigation}) => {

    const handleLogin = async (email: string, password: string) => {

      await pb.collection('users').authWithPassword(
        email,
        password,
      ).then((data) => {
        if (pb.authStore.isValid) {
          console.log(data)
          navigation.navigate('logged', {name: data.record.name})
        }
      }).catch((err: DOMException) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Email ou senha inválidos',
          text2: err.message
        });
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
    <>
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
    <Toast />
    </>
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
