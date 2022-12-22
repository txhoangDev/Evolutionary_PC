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
                width: '100%',
                height: '100%',
                paddingLeft: 0,
                paddingRight: 0
            }}
        >
            <Container>
                <Home />
            </Container>
        </div>
    )
}

export default HomePage;