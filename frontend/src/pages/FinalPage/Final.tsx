import React from 'react';
import { Container, Box } from '@mui/material';
import Parts from '../../components/Parts/Parts';
import bg from '../../assets/images/parts_bg.svg';

const Final:React.FC = () => {
    return (
        <Box
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize:"cover", 
                height: '100vh',
                zIndex: '-1'
            }}
        >
            <Container disableGutters maxWidth={false}>
            <Parts />
        </Container>
        </Box>
    )
}

export default Final;