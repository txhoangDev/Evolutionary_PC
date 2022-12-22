import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Fade,
    useMediaQuery,
    Box,
    Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import white1 from '../../assets/images/white_pc1.png';
import white2 from '../../assets/images/white_pc2.png';
import white3 from '../../assets/images/white_pc3.png';
import white4 from '../../assets/images/white_pc4.png';
import white5 from '../../assets/images/white_pc5.png';

const images: string[] = [white1, white2, white3, white4, white5]

const Home: React.FC = () => {
    const theme = useTheme();
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(true);

    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setImage((prev) => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => {
                return i === 4 ? 0 : i + 1;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return(
        <Grid 
            container 
            direction="column"
            alignItems="center"
        >
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 4 }}
                >
                    <Typography variant="h4">
                        Parts Selector
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h2" sx={{ fontWeight: 700 }}>
                        Evolutionary PC Builder
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    sx={{ mt: 2 }}
                >
                    <Typography component="p" variant="h5">
                        An application to pick all the best components for 
                        <br />
                        your specific needs
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button variant="contained" sx={{ mt: 2 }}>
                    Get Started
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    sx={{ mt: 4 }}
                >
                    <Fade in={image} timeout={1000}>
                        <img src={images[index]} alt="image" loading="lazy" />
                    </Fade>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home;