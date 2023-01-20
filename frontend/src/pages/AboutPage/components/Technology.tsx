import React from 'react';
import { 
    Grid, 
    Box, 
    useMediaQuery, 
    Typography,
    Avatar,
    Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BoltIcon from '@mui/icons-material/Bolt';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import TuneIcon from '@mui/icons-material/Tune';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Technology: React.FC = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    return(
        <Box
            padding={{ xs: 2, sm: 4 }}
            borderRadius={2}
            bgcolor='#E0E0E0'
            data-aos={'fade-up'}
            sx={{
                mt: 4,
                width: '100%',
                height: '100%'
            }}
        >
            <Grid
                container
                spacing={isMd ? 4 : 2 }
                direction="column"
                alignItems="center"
            >
                <Grid item xs={12} md={6}>
                    <Typography variant="h3">
                        Why Us?
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <Stack spacing={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#547793' }}>
                                    <QuestionMarkIcon />
                                </Avatar>
                                <Typography variant="h6">
                                    No Compatibility Issues
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Buy the parts given to you without
                                    <br />
                                    worrying about compatibility issues.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#547793' }}>
                                    <AssessmentIcon />
                                </Avatar>
                                <Typography variant="h6">
                                    Best Possible Performance
                                </Typography>
                                <Typography variant="body1" component="p">
                                    With out technology, you are 
                                    <br />
                                    guaranteed the best performance.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#547793' }}>
                                    <TuneIcon />
                                </Avatar>
                                <Typography variant="h6">
                                    Fully Customizeable
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Our parts selection will not hinder
                                    <br />
                                    your ability to customize your PC!
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#547793' }}>
                                    <EmojiEmotionsIcon />
                                </Avatar>
                                <Typography variant="h6">
                                    Friendly Interface
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Our application is so easy to use
                                    <br />
                                    the kids and elderly could use it!
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#547793' }}>
                                    <MobileFriendlyIcon />
                                </Avatar>
                                <Typography variant="h6">
                                    Mobile Friendly
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Take it on the go! This is build for you
                                    <br />
                                    to take anywhere!
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#547793' }}>
                                    <BoltIcon />
                                </Avatar>
                                <Typography variant="h6">
                                    Fast and Reliable
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Our AI will only take a few minutes
                                    <br />
                                    to generate your build
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Technology;