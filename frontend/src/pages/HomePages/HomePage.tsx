import React from 'react';
import { Container, Box } from '@mui/material';
import Home from '../../components/Home/Home';
import bg from '../../assets/images/trianglify-lowres.png';

const HomePage = () => {
    return (
        <Box
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize:"cover", 
            }}
        >
            <Container>
                <Home />
            </Container>
        </Box>
    )
}

export default HomePage;