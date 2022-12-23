import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const name: React.ReactElement = <Typography variant="h6" component="a" sx={{fontWeight: 700}}>Evolutionary PC</Typography>

    return(
        <Box
            textAlign="center"
            sx={{
                backgroundColor: 'white',
                height: "30px",
                width: "100%",
                bottom: 0,
                marginTop: "auto"
            }}
        >
            <Typography variant="h6" component="p">
                &copy; {new Date().getFullYear()} Copyright: {name}
            </Typography>
        </Box>
    )
}

export default Footer;