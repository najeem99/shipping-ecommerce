import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { colors, spacing, typography } from '../../theme'; // Assuming you have a theme setup
import TextField from '../../components/TextField';
import Button from '../Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postAddressForUser, updateAddressForUser } from '../../services/AddressService';
import { UserDataContext } from '../../context/UserDataContext';

// Validation schema with Yup
const AddressSchema = Yup.object().shape({
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    area: Yup.string().required('Area is required'),
    building: Yup.string().required('Building is required'),
    landmark: Yup.string(),
    isDefault: Yup.boolean(),  // No need for validation; just a boolean
});

const AddAddressModal = ({ isVisible, onClose, editableData }) => {
    const [isDefault, setIsDefault] = useState(false); // For Switch
    const { user } = useContext(UserDataContext);
    const userId = user.user.id;

    const handleSubmit = async (value) => {
        console.log(editableData)
        if (editableData) {
            updateAddress(value);
        } else {
            createAddress(value);
        }
    }
    const updateAddress = async (value) => {
        try {
            console.log('updateAddress')
            await updateAddressForUser(userId, editableData.id, value); // Assuming this API call confirms the removal
            onClose();
        } catch (error) {
            console.error('Error adding Address:', error);
        }

    }

    const createAddress = async (value) => {
        try {
            console.log('createAddress')

            await postAddressForUser(userId, value); // Assuming this API call confirms the removal
            onClose();
        } catch (error) {
            console.error('Error adding Address:', error);
        }

    }

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <KeyboardAwareScrollView>
                        <Text style={styles.title}>Add New Address</Text>

                        <Formik
                            initialValues={{
                                city: editableData?.city || '',
                                country: editableData?.country || '',
                                area: editableData?.area || '',
                                building: editableData?.building || '',
                                landmark: editableData?.landmark || '',
                                isDefault: editableData?.isDefault || false,  // Add isDefault to initial values
                            }}
                            validationSchema={AddressSchema}
                            onSubmit={(values) => {
                                 handleSubmit({ ...values, isDefault })
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <TextField
                                        style={styles.input}
                                        placeholder="City"
                                        label="City"
                                        onChangeText={handleChange('city')}
                                        onBlur={handleBlur('city')}
                                        value={values.city}
                                        errorText={touched.city && errors.city}
                                    />

                                    <TextField
                                        style={styles.input}
                                        placeholder="Country"
                                        label="Country"
                                        onChangeText={handleChange('country')}
                                        onBlur={handleBlur('country')}
                                        value={values.country}
                                        errorText={touched.country && errors.country}
                                    />

                                    <TextField
                                        style={styles.input}
                                        placeholder="Area"
                                        label="Area"
                                        onChangeText={handleChange('area')}
                                        onBlur={handleBlur('area')}
                                        value={values.area}
                                        errorText={touched.area && errors.area}
                                    />

                                    <TextField
                                        style={styles.input}
                                        placeholder="Building"
                                        label="Building"
                                        onChangeText={handleChange('building')}
                                        onBlur={handleBlur('building')}
                                        value={values.building}
                                        errorText={touched.building && errors.building}
                                    />

                                    <TextField
                                        style={styles.input}
                                        placeholder="Landmark"
                                        label="Landmark"
                                        onChangeText={handleChange('landmark')}
                                        onBlur={handleBlur('landmark')}
                                        value={values.landmark}
                                        errorText={touched.landmark && errors.landmark}
                                    />

                                    {/* Switch for isDefault */}
                                    <View style={styles.switchContainer}>
                                        <Text style={styles.switchLabel}>Set as Default Address</Text>
                                        <Switch
                                            value={isDefault}
                                            onValueChange={(value) => setIsDefault(value)}
                                            thumbColor={isDefault ? colors.tint : colors.palette.primary600}
                                            trackColor={{
                                                false: colors.palette.neutral300,
                                                true: colors.palette.primary300
                                            }}
                                        />
                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <Button onPress={onClose} style={styles.closeButton} label="Close" />
                                        <Button onPress={handleSubmit} style={styles.submitButton} label="Submit" />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContent: {
        width: '90%',
        padding: spacing.md,
        backgroundColor: colors.background,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        marginBottom: spacing.sm,
        color: colors.text,
    },
    input: {
        // Add your input styles here if needed
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: spacing.sm,
    },
    switchLabel: {
        color: colors.text,
        fontSize: typography.fontSize.xl,
        fontFamily: typography.primary.light,

    },
    errorText: {
        fontSize: typography.fontSize.sm,
        color: colors.error,
        marginBottom: spacing.sm,
    },
    submitButton: {
        paddingVertical: spacing.md,
        marginHorizontal: spacing.xxs,
    },
    closeButton: {
        backgroundColor: colors.palette.primary600,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.xxs,
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: spacing.sm,
    },
});

export default AddAddressModal;
