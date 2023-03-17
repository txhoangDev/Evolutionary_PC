import React from "react";
import { Box } from "@mui/material";

import rc from "../../../assets/images/robot-computer.png";
import bg from "../../../assets/backgrounds/signup_bg.svg";

const Hero: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        component="img"
        loading="lazy"
        src={rc}
        alt="bg"
        borderRadius={2}
        maxWidth={"100%"}
        maxHeight={"auto"}
        sx={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default Hero;
