import { Pressable, PressableProps, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, spacing, typography } from '../theme';

interface ButtonProps extends PressableProps {
    style?: StyleProp<ViewStyle>; // Optional style
    label: string;               // Label is required
    children?: React.ReactNode;   // Children are optional
    onPress?: () => void;         // Example of other props
}

const Button: React.FC<ButtonProps> = ({ style, label, children, ...props }) => {

    return (
        <View style={{ alignSelf: 'center' }}>
            <Pressable
                style={({ pressed }) => ([styles.buttonContainer, style, { opacity: pressed || props?.disabled ? 0.5 : 1 }])}
                {...props}
            >
                {label && (
                    <Text style={styles.label}>{label}</Text>
                )}
                {children}
            </Pressable >
        </View>
    );
}
const styles = StyleSheet.create({
    label: {
        color: colors.palette.primary100,
        fontSize: typography.fontSize.xl,
        fontFamily: typography.primary.bold,
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: colors.tint,
        padding: spacing.xxxs,
        display: 'flex',
        width: 'auto',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        color: colors.text,
        fontFamily: typography.primary.medium,
        fontSize: typography.fontSize.xl,
        borderRadius: 50,
        minHeight: 50,
    },
});

export default Button;