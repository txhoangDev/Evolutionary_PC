import React from 'react';
import { 
    Grid, 
    useMediaQuery, 
    Typography,
    Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import ComputerIcon from '@mui/icons-material/Computer';

const Workings: React.FC = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    return(
        <Box
            padding={{ xs: 2, sm: 4 }}
            borderRadius={2}
            bgcolor='#C1C9CC'
            data-aos={'fade-up'}
            sx={{
                mt: 4,
                width: '100%'
            }}
        >
            <Grid
                container
                spacing={isMd ? 4 : 2 }
                direction="column"
                alignItems="center"
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ textAlign: "center"}}
                >
                    <Typography variant="h3">
                        How it works
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <Grid 
                        container 
                        spacing={isMd ? 4 : 2 }
                        alignItems="center"
                    >
                        <Grid item>
                            <Box
                                textAlign='center'
                                sx={{
                                    backgroundColor: '#F7F2EF',
                                    minWidth: 200,
                                    minHeight: 200
                                }}
                                borderRadius={2}
                            >
                                <SettingsIcon sx={{ mt: 3, fontSize: 100 }} />
                                <Typography variant="body1" component="p">
                                    Configure Settings
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box
                                textAlign='center'
                                sx={{
                                    backgroundColor: '#F7F2EF',
                                    minWidth: 200,
                                    minHeight: 200
                                }}
                                borderRadius={2}
                            >
                                {/* <Box
                                    component="img"
                                    loading="lazy"
                                    src={check}
                                    alt="components"
                                    sx={{
                                        objectFit: 'cover',
                                    }}
                                /> */}
                                <CheckIcon sx={{ mt: 3, fontSize: 100 }} />
                                <Typography variant="body1" component="p">
                                    Select custom parts
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box
                                textAlign='center'
                                sx={{
                                    backgroundColor: '#F7F2EF',
                                    minWidth: 200,
                                    minHeight: 200
                                }}
                                borderRadius={2}
                            >
                                <ComputerIcon sx={{ mt: 3, fontSize: 100}} />
                                <Typography variant="body1" component="p">
                                    Purchase and build
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Workings;