import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    children: React.ReactNode;
    style: StyleProp<TextStyle>;
}

const StyledText: React.FC<Props> = ({ children, style }) => {

    const [loaded] = useFonts({
        Rubik: require('../assets/Fonts/Rubik-Light.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Rubik'
    },
});

export default StyledText;