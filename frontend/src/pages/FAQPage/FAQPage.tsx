import React from 'react';
import { Container, Box } from '@mui/material';
import FAQ from './components/FAQ';
import FAQTitle from './components/FAQTitle';

const FAQPage: React.FC = () => {
    return(
        <Container disableGutters maxWidth={false}>
            <Box 
                bgcolor="#C1C9CC" 
                sx={{ 
                    height: '100px'
                }} 
                justifyContent="center"
                alignItems="center"
                display="flex"
            >
                <FAQTitle />
            </Box>
            <Container>
                <FAQ />
            </Container>
        </Container>
    )
}

export default FAQPage;