import React from 'react';
import RegistrationLayout from '../../layouts/registration/RegistrationLayout';
import Hero from './components/Hero';
import SignUp from './components/SignUp';

const SignupPage: React.FC = () => {
    return (
        <RegistrationLayout>
            <SignUp />
            <Hero />
        </RegistrationLayout>
    )
}

export default SignupPage;