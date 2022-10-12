import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

function SimpleBuild() {
    let navigate = useNavigate()

    const [budget, setBudget] = useState(1000)

    const changeBudget = (e) => {
        setBudget(e.target.value)
    }

    const Advanced = () => {
        navigate("/advanced-build")
    }

    const Build = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                budget: budget
            }),
        };
        fetch("/api/simple-builds", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/selection/" + data.code));
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Simple Build Menu
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" onChange={(e) => changeBudget(e)} defaultValue={budget} inputProps={{ min: 1, style: { textAlign: "center" } }} />
                    <FormHelperText>
                        <div align="center">Budget</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={Advanced}>
                    Go To Advanced Build
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={Build}>
                    Build!
                </Button>
            </Grid>
        </Grid>
    )
}
export default SimpleBuild;