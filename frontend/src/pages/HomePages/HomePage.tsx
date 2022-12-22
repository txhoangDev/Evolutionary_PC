import React from 'react';
import { Container, Box } from '@mui/material';
import Home from '../../components/Home/Home';
import bg from '../../assets/images/trianglify-lowres.png';

const HomePage = () => {
    return (
        <div
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize:"cover", 
                flex: "auto",
                height: "100%",
            }}
        >
            <Container>
                <Home />
            </Container>
        </div>
    )
}

export default HomePage;