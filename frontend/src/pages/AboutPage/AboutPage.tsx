import React from 'react';
import { Container } from '@mui/material';
import About from '../../components/About/About';
import Workings from '../../components/About/Workings';
import Technology from '../../components/About/Technology';
import Testmony from '../../components/About/Testmony';
import Build from '../../components/About/Build';

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
    )
}

export default AboutPage;