import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Grow,
    Box,
} from '@mui/material';
import cpu from '../../assets/images/cpu.png';
import gpu from '../../assets/images/gpu.png';
import mb from '../../assets/images/mb.png';

const images: string[] = [cpu, gpu, mb]

const Home: React.FC = () => {
    const [index, setIndex] = useState(-1);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
        const interval = setInterval(() => {
            setIndex((i) => {
                return i === 2 ? 0 : i + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return(
        <Grid 
            container 
            spacing={1}
            direction="column"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h2">
                    The Evolutionary PC Builder
                </Typography>
            </Grid>
            <Grid item>
                <Grow in={checked}>
                    <Box>
                        <img src={images[index]} alt="image" />
                    </Box>
                </Grow>
            </Grid>
        </Grid>
    )
}

export default Home;