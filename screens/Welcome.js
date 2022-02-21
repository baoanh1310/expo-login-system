import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
} from '../components/styles';

const Welcome = () => {

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="contain" source={require('./../assets/imgs/icebear_new.png')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome!</PageTitle>
                    <SubTitle welcome={true}>icebear.near</SubTitle>
                    <SubTitle welcome={true}>dataholicguy@gmail.com</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/imgs/icebear.jpg')} />
                        <Line />
                        <StyledButton onPress={() => {}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;