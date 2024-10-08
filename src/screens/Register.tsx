import { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Alert } from 'react-native';
import { ThemeContext } from '../util/ThemeManager';
import TextField from '../components/TextField';
import { colors, spacing, typography } from '../theme';
import Button from '../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import globalStyles from '../theme/global-styles';
import { getUsers, saveUser } from '../services/UserService';
import { Formik } from 'formik';
import * as yup from 'yup';
import { GetUsers } from '../types/user';
import React from 'react';
import ShowHidePasswordIcon from '../components/ShowHidePasswordIcon';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import {  useUserData } from '../context/UserDataContext';

const userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(12),
    confirmPassword: yup.string()
        .required("Please confirm your password")
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});



function Register({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const [error, setError] = useState(null)
    const { setUserData } = useUserData();

    const { passwordVisibility: passwordVisibility, handlePasswordVisibility: handlePasswordVisibility } = useTogglePasswordVisibility();
    const { passwordVisibility: confirmPasswordVisibility, handlePasswordVisibility: handleConfirmPasswordVisibility } = useTogglePasswordVisibility();

    const getAllUsers = async (): Promise<GetUsers[]> => {
        try {
            const res = await getUsers();
            return res
        } catch (error) {
            console.error(error);
            setError("Failed to fetch users. Please try again later.");
        }
    }
    const checkIfUserExists = (userDetails, allUsersData: GetUsers[]): boolean => {
        if (allUsersData?.length > 0) {
            const userFound = allUsersData.some((val) => {
                return val?.user?.email === userDetails?.email;
            });
            return userFound
        }
        return false
    }

    const handleSubmit = async (values) => {
        setError(null);

        const res = await getAllUsers();
        console.log('checkIfUserExists', checkIfUserExists(values, res))
        if (checkIfUserExists(values, res)) {

            setError("Email already Exists");
        } else {
            const payload = {
                "user": {
                    "name": values?.name || '',
                    "phoneNumber": "+971501234567",
                    "email": values.email,
                    "currency": "AED",
                    "language": "en",
                    "image": "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/07/John-Cena-13.jpg?size=*:900",
                    "address": [],
                    "password": values.password,
                    "orders": [],
                    "cartItems": []
                }
            }
            try {
                const res = await saveUser(payload);
                console.log('Registered created successfully:',res);
                setUserData(res)
            } catch (error) {
                Alert.alert("Issues Logging in");

            }


        }

    }
    return (
        <View style={{ width: '100%', paddingHorizontal: spacing.sm, margin: 'auto' }}>
            <KeyboardAwareScrollView>
                <Image
                    source={require('../../assets/logo.png')}
                    style={globalStyles.logoImage} />
                <Text style={globalStyles.title}>Welcome Back</Text>
                <Text style={globalStyles.title}>Let's Sign you in...</Text>
                <Text style={[globalStyles.errorText, { textAlign: 'center' }]}>{error}</Text>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validateOnBlur={true}
                    validateOnChange={true}
                    validationSchema={userSchema}

                >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid }) => (
                        <>

                            <TextField label='Name' keyboardType='ascii-capable'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                errorText={((touched?.name && errors.name) && errors.name)}
                            ></TextField>
                            <TextField label='Email' keyboardType='email-address'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                errorText={((touched?.email && errors.email) && errors.email)}
                            ></TextField>
                            <TextField label='Password' secureTextEntry={passwordVisibility}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                errorText={((touched?.password && errors.password) && errors.password)}

                            >
                                <ShowHidePasswordIcon
                                    onPress={handlePasswordVisibility}
                                    passwordVisibility={passwordVisibility}
                                ></ShowHidePasswordIcon>

                            </TextField>
                            <TextField label='Confirm Password' secureTextEntry={confirmPasswordVisibility}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                errorText={((touched?.confirmPassword && errors.confirmPassword) && errors.confirmPassword)}

                            >
                                <ShowHidePasswordIcon
                                    onPress={handleConfirmPasswordVisibility}
                                    passwordVisibility={confirmPasswordVisibility}
                                ></ShowHidePasswordIcon>

                            </TextField>

                            <Button style={{ marginTop: spacing.xs }} label='Register'
                                onPress={() => handleSubmit()}
                                disabled={!isValid}
                            ></Button>
                        </>
                    )}

                </Formik>


                <Text onPress={() => navigation.navigate('Login')} style={globalStyles.registerText}>Already have an account?
                    <Text style={[globalStyles.registerText, globalStyles.registerSubText]}> Login</Text> </Text>
            </KeyboardAwareScrollView>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

// const globalStyles = StyleSheet.create({
// });

export default Register;