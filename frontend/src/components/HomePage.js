import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { useNavigate } from "react-router-dom";

function HomePage() {

    let navigate = useNavigate()

    const simple = () => {
        navigate("/simple-build")
    }

    const advance = () => {
        navigate("/advanced-build")
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h1" variant="h1">
                    Welcome!
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Please select a build option
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={simple}>
                    Simple Build
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={advance}>
                    Advanced Build
                </Button>
            </Grid>
        </Grid>
    );
}
export default HomePage;