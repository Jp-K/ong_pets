import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import StyledText from "./components/StyledText";
import ItalicText from "./components/ItalicText";

export default function App() {

  const handleLogin = (username: string, password: string) => {
    console.log(username);
    console.log(password);
  };

  return (
    <View style={styles.container}>
      <Login onLogin={handleLogin} />
    </View>
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
