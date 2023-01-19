import React from 'react';
import { Container, Box } from '@mui/material';
import Home from '../../components/Home/Home';
import bg from '../../assets/images/bg.svg';

const HomePage = () => {
    return (
        <Box
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize:"cover", 
                height: '100vh'
            }}
        >
            <Container>
                <Home />
            </Container>
        </Box>
    )
}

export default HomePage;