import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Image } from 'react-native';
import StyledText from "../components/StyledText";
import BorderPlaceholderInput from "../components/BorderPlaceholderInput";
import {useFonts} from "expo-font";
interface Props {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeScreen, setActiveScreen] = useState(0);
    

    const [loaded] = useFonts({
        Rubik: require('../assets/Fonts/Rubik-Light.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.screenToggleButtons}>
                <Pressable style={ activeScreen === 0 ? styles.buttonActive : styles.buttonDisabled} onPress={() => setActiveScreen(0)}>
                    <StyledText style={[styles.buttonText, activeScreen === 1 ? {color: "#898989"} : {}]}>Login</StyledText>
                </Pressable>
                <View style={{margin: 10}} />
                <Pressable style={ activeScreen === 1 ? styles.buttonActive : styles.buttonDisabled} onPress={() => setActiveScreen(1)}>
                    <StyledText style={[styles.buttonText, activeScreen === 0 ? {color: "#898989"} : {}]}>Cadastro</StyledText>
                </Pressable>
            </View>
            <BorderPlaceholderInput
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={setUsername} />
            <BorderPlaceholderInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} />
            <Pressable style={styles.button1} onPress={() => onLogin(username, password)}>
                <StyledText style={styles.buttonText}>Acessar</StyledText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 269,
        height: 42,
        borderWidth: 1,
        borderColor: '#FFD978',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    button1: {
        backgroundColor: '#FFC746',
        width: 148,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonActive: {
        backgroundColor: '#FFC746',
        width: 104,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonDisabled: {
        backgroundColor: '#F2F2F2',
        width: 104,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        color: "#898989",
    },
    buttonText: {
        color: 'white',
    },
    screenToggleButtons : {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 36,
    },
    logoContainer: {
        height: 150,
        marginBottom: 88,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 50,
        elevation: 5,
        borderRadius: 100,
    },
    logo: {
        position: "relative",
        top: -2,
        width: 150,
        height: 150,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    }
});

export default Login;
