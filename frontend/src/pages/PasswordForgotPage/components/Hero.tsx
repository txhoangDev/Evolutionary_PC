import React from "react";
import { Box } from "@mui/material";
import forgotpass from '../../../assets/images/forgotpass.png';

const Hero: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        component="img"
        loading="lazy"
        src={forgotpass}
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