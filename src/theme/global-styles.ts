import { Dimensions, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '.';

const screenWidth = Dimensions.get('window').width;

const globalStyles = StyleSheet.create({
    title: {
        fontSize: typography.fontSize.xxxl,
        fontFamily: typography.primary.bold,
        color: colors.tint
    },
    logoImage: {
        width: screenWidth * 0.4,    // 80% of screen width
        height: undefined,         // This is necessary when using aspectRatio
        aspectRatio: 1,            // Adjusts based on the image's natural dimensions
        marginHorizontal: 'auto',
        marginVertical: 30,
        opacity: 0.7
    },
    registerText: {
        fontFamily: typography.primary.medium,
        color: colors.text,
        marginVertical: spacing.xs,
        textAlign: 'center',
        fontSize: typography.fontSize.md
    },
    registerSubText: {
        fontFamily: typography.primary.bold,
        color: colors.tint,
    },
    errorText: {
        color: colors.error,
        textAlign: 'center',
        fontSize: typography.fontSize.md,
        marginVertical: spacing.xxs
    }
});

export default globalStyles;
