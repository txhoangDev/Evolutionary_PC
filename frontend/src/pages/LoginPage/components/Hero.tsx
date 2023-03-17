import React from "react";
import { Box } from "@mui/material";

import bg from "../../../assets/backgrounds/login_bg.svg";
import login from "../../../assets/images/login.png";

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
        src={login}
        alt="bg"
        borderRadius={2}
        maxWidth={"100%"}
        maxHeight={"auto"}
        sx={{
          objectFit: "cover",
          backgroundColor: "rgba(247, 242, 239, 0.3)",
        }}
      />
    </Box>
  );
};

export default Hero;
