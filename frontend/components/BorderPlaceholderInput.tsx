import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, TextInput, View} from 'react-native';
import StyledText from "./StyledText";
import {useFonts} from "expo-font";


const BorderPlaceholderInput: (props: any, ref: any) => JSX.Element = (props, ref) => {

    // @ts-ignore
    const { placeholder, style, onChange, ...rest } = props;

    const [loaded] = useFonts({
        Rubik: require('../assets/Fonts/Rubik-Light.ttf'),
    });

    return (
        <View style={styles.container}>
        <StyledText style={styles.placeholder}>{placeholder}</StyledText>
        <TextInput
            {...rest}
            style={[styles.text, style]}
        />
        </View>);
};

const styles = StyleSheet.create({
    placeholder: {
        position: 'absolute',
        left: 20,
        top: 0,
        backgroundColor: 'white',
        width: 55,
        paddingLeft: 5,
        paddingRight: 2,
        color: 'gray',
        zIndex: 1,
    },
    container: {
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    text: {
        fontFamily: 'Rubik',
    }
});

export default BorderPlaceholderInput;