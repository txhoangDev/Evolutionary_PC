import React, { useState } from 'react';
import {
    Typography,
    Grid
} from '@mui/material';   
import cpu from '../../assets/images/cpu.png';

const Home: React.FC = () => {
    const [image, setImage] = useState(cpu);

    return(
        <Grid 
            container 
            spacing={1}
            direction="column"
            alignItems="center"
        >
            <Grid item xs={3}>
                <Typography variant="h2">
                    The Evolutionary PC Builder
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <img src={image} />
            </Grid>
        </Grid>
    )
}

export default Home;