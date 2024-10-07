import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { FormikErrors } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface TextFieldProps extends TextInputProps {
    label?: string;
    style?: StyleProp<ViewStyle>; // Optional style prop
    errorText?: string
}

const TextField: React.FC<TextFieldProps> = ({ label, style, errorText, children, ...props }) => {
    return (
        <View style={{ width: '100%' }}>

            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <View style={styles.inputContainer}>

                <TextInput
                    {...props}
                    style={styles.input}
                    placeholderTextColor={colors.textDim}
                ></TextInput>
                {children}
            </View>
            {errorText && (<Text style={styles.errorTextStyle} >{errorText}</Text>)}
        </View>
    );
}
const styles = StyleSheet.create({
    label: {
        color: colors.text,
        fontSize: typography.fontSize.xl,
        fontFamily: typography.primary.light,

    },
    inputContainer: {
        borderWidth: 1,
        backgroundColor: colors.palette.neutral100,
        width: '100%',
        marginBottom: spacing.xxxs,
        borderColor: colors.border,
        padding: spacing.xxxs,
        borderRadius: 10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
     },
    input: {
        flex:1,
        paddingHorizontal: spacing.sm,
        color: colors.text,
        fontFamily: typography.primary.medium,
        fontSize: typography.fontSize.xl,
        minHeight: 50,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingLeft: 10,
    },

});

export default TextField;