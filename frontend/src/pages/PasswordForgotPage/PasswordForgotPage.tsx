import React from "react";

import RegistrationLayout from "../../layouts/registration/RegistrationLayout";
import Input from "./components/Input";
import Hero from "./components/Hero";

const PasswordForgotPage: React.FC = () => {
  return (
    <RegistrationLayout>
      <Hero />
      <Input />
    </RegistrationLayout>
  );
};

export default PasswordForgotPage;
