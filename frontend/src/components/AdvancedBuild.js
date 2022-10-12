import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function AdvancedBuild() {
    let navigate = useNavigate()

    const [buildState, setState] = useState({ budget: 1000, cpu_type: "AMD", gpu_type: "NVIDIA", aio_pref: "LIQUID" })

    const changeBudget = (e) => {
        setState({ budget: e.target.value })
    }

    const changeCpuType = (e) => {
        setState({ cpu_type: e.target.value })
    }

    const changeGpuType = (e) => {
        setState({ gpu_type: e.target.value })
    }

    const changeAioPref = (e) => {
        setState({ aio_pref: e.target.value })
    }

    const simple = () => {
        navigate("/simple-build")
    }

    const Build = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                budget: buildState.budget,
                cpu_type: buildState.cpu_type,
                gpu_type: buildState.gpu_type,
                aio_pref: buildState.aio_pref
            }),
        };
        fetch("/api/advanced-builds", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/selection/" + data.code));
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Advanced Build Menu
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" onChange={(e) => changeBudget(e)} defaultValue={buildState.budget} inputProps={{ min: 1, style: { textAlign: "center" } }} />
                    <FormHelperText>
                        <div align="center">Budget</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">CPU Preference</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="AMD" onChange={(e) => changeCpuType(e)}> 
                        <FormControlLabel value="AMD" control={<Radio color="primary" />} label="AMD" labelPlacement="bottom" />
                        <FormControlLabel value="INTEL" control={<Radio color="secondary" />} label="Intel" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">GPU Preference</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="NVIDIA" onChange={(e) => changeGpuType(e)}> 
                        <FormControlLabel value="NVIDIA" control={<Radio color="primary" />} label="NVIDIA" labelPlacement="bottom" />
                        <FormControlLabel value="AMD" control={<Radio color="secondary" />} label="AMD" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Liquid or Air Cooling</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="LIQUID" onChange={(e) => changeAioPref(e)}> 
                        <FormControlLabel value="LIQUID" control={<Radio color="primary" />} label="Liquid" labelPlacement="bottom" />
                        <FormControlLabel value="AIR" control={<Radio color="secondary" />} label="Air" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={simple}>
                    Go To Simple Build
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
export default AdvancedBuild;