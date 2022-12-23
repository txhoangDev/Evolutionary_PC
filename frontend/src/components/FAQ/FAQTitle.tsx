import React from 'react';
import { Typography, Box } from '@mui/material/';

const FAQTitle: React.FC = () => {
    return (
        <Box textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                FAQ
            </Typography>
        </Box>
    )
}

export default FAQTitle;