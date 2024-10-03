import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../theme';

// Define the interface for the component props
interface ShowHidePasswordIconProps {
    passwordVisibility: boolean; // Required prop
    onPress: () => void;         // Required prop for the press event
    style?: ViewStyle;           // Optional style prop
}

// Functional component with typed props
const ShowHidePasswordIcon: React.FC<ShowHidePasswordIconProps> = ({ passwordVisibility, onPress, style, ...props }) => {
    return (
        <Icon
            {...props}
            style={[styles.icon, style]}
            name={passwordVisibility ? 'eye' : 'eye-slash'}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: spacing.sm,
        fontSize: typography.fontSize.xl,
    },
});

export default ShowHidePasswordIcon;
