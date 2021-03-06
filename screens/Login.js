import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import { Octicons, Ionicons } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    Colors,
} from '../components/styles';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://localhost:3000/user/login';

        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    navigation.navigate('Welcome', { ...data[0] });
                }
                setSubmitting(false);
            }) 
            .catch((err) => {
                console.log(err.JSON());
                setSubmitting(false);
                handleMessage("An error occurred. Check your network and try again");
            });
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('./../assets/imgs/icebear_new.png')} />
                    <PageTitle>Icebear System</PageTitle>
                    <SubTitle>Account Login</SubTitle>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email == '' || values.password == '') {
                                handleMessage("Please fill all the fields");
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                            <MyTextInput 
                                label="Email Address"
                                icon="mail"
                                placeholder="abc@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput 
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>}

                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}

                            <Line />
                            <ExtraView>
                                <ExtraText>Don't have an account already?</ExtraText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <TextLinkContent>
                                        Signup
                                    </TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>)}

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login;