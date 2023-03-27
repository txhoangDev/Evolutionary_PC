import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { verifyEmail } from "../../http-common";
import email from "../../assets/images/email.png";
import email_succcess from "../../assets/backgrounds/email_success.svg";
import sad_shiba from "../../assets/images/sad_shiba.png";

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const { key } = useParams<{ key?: string }>();
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const keyString = key ? key.toString() : "";
    verifyEmail(keyString).then((response) => {
      if (response === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/build");
        }, 5000);
      }
    });
  }, [key, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${email_succcess})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        {success ? (
          <Box>
            <Typography variant="h1">THANK YOU!</Typography>
            <Typography variant="h4">
              You have successfully verified your email!
            </Typography>
            <Typography variant="h4">
              Please wait while we redirect you.
            </Typography>
            <Box
              component="img"
              loading="lazy"
              src={email}
              alt="bg"
              borderRadius={2}
              maxWidth={"600px"}
              maxHeight={"600px"}
              sx={{
                objectFit: "cover",
              }}
            />
          </Box>
        ) : (
          <Box>
            <Box
              component="img"
              loading="lazy"
              src={sad_shiba}
              alt="bg"
              borderRadius={2}
              maxWidth={"600px"}
              maxHeight={"600px"}
              sx={{
                objectFit: "cover",
              }}
            />
            <Typography variant="h2">We're sorry!</Typography>
            <Typography variant="h6">
              Something went wrong on our side. Please try again.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default VerifyEmailPage;
