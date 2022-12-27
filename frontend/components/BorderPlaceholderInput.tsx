import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, TextInput, View} from 'react-native';
import StyledText from "./StyledText";


const BorderPlaceholderInput: (props: any) => JSX.Element = (props) => {

    // @ts-ignore
    const { placeholder, style, onChange, ...rest } = props;

    return (
        <View style={styles.container}>
        <StyledText style={styles.placeholder}>{placeholder}</StyledText>
        <TextInput
            {...rest}
            style={style}
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
});

export default BorderPlaceholderInput;