import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import StyledText from "../components/StyledText";

interface Props {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={setUsername} />
            <TextInput
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
    buttonText: {
        color: 'white',
    }
});

export default Login;
