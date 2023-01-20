import React from 'react';
import { Container } from '@mui/material';
import About from './components/About';
import Workings from './components/Workings';
import Technology from './components/Technology';
import Testmony from './components/Testmony';
import Build from './components/Build';

const AboutPage = () => {

    return(
        <Container>
            <Container>
                <About />
            </Container>
            <Container>
                <Workings />
            </Container>
            <Container>
                <Technology />
            </Container>
            <Container>
                <Testmony />
            </Container>
            <Container>
                <Build />
            </Container>
        </Container>
    );
}

export default AboutPage;