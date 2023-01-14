import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Image } from 'react-native';
import StyledText from "../components/StyledText";
import BorderPlaceholderInput from "../components/BorderPlaceholderInput";
import {useFonts} from "expo-font";
import PocketBase from 'pocketbase';
interface Props {
    onLogin: (username: string, password: string) => void;
}

const pb = new PocketBase('http://192.168.1.11:8090');

pb.autoCancellation(false);

async function onCreateUser(nameCreate: string, usernameCreate: string, passwordCreate: string, passwordConfirmCreate: string) {

    const data = {
        username: '',
        email: usernameCreate,
        emailVisibility: true,
        password: passwordCreate,
        passwordConfirm: passwordConfirmCreate,
        name: nameCreate
    };

    await pb.collection('users').create(data).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });;

}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [nameCreate, setNameCreate] = useState('');
    const [usernameCreate, setUsernameCreate] = useState('');
    const [passwordCreate, setPasswordCreate] = useState('');
    const [passwordConfirmCreate, setPasswordConfirmCreate] = useState('');

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
            
            { activeScreen === 0 ? (
            <>
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
            </>
            ) :
            (<>
            <BorderPlaceholderInput
                style={styles.inputCreate}
                placeholder="Nome"
                value={nameCreate}
                onChangeText={setNameCreate} />
            <BorderPlaceholderInput
                style={styles.inputCreate}
                placeholder="Email"
                value={usernameCreate}
                onChangeText={setUsernameCreate} />
            <BorderPlaceholderInput
                style={styles.inputCreate}
                placeholder="Senha"
                secureTextEntry={true}
                value={passwordCreate}
                onChangeText={setPasswordCreate} />  
            <BorderPlaceholderInput
                style={styles.inputCreate}
                placeholder="Confirmar senha"
                secureTextEntry={true}
                value={passwordConfirmCreate}
                onChangeText={setPasswordConfirmCreate} /> 
            </>)
            }
            { activeScreen === 0 ? (
            <Pressable style={styles.button1} onPress={() => onLogin(username, password)}>
                <StyledText style={styles.buttonText}>Acessar</StyledText>
            </Pressable>
            ) : 
            (
            <Pressable style={styles.button1} onPress={() => onCreateUser(nameCreate, usernameCreate, passwordCreate, passwordConfirmCreate)}>
                <StyledText style={styles.buttonText}>Confirmar</StyledText>
            </Pressable>
            )
            }
            { activeScreen === 0 ? (
            <Pressable style={styles.button2} onPress={() => console.log("esquecer")}>
                <StyledText style={styles.textForgotPassword}>Esqueci minha senha</StyledText>
            </Pressable>
            ) : <></>
            }
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
    inputCreate: {
        width: 269,
        height: 42,
        borderWidth: 1,
        borderColor: '#FFD978',
        borderRadius: 10,
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
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
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
    textForgotPassword: {
        color: '#FFC746',
        textDecorationLine: 'underline',
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
