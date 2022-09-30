import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class UserSelectionPage extends Component {
    defaultCPU = "amd";
    defaultGPU = "nvidia";
    defaultAIO = "N";
    defaultBudget = 1000;

    constructor(props){
        super(props);
        this.state = {
            budget: this.defaultBudget,
            cpu_type: this.defaultCPU,
            gpu_type: this.defaultGPU,
            aio_pref: this.defaultAIO
        };

        this.handleBuildButtonPressed = this.handleBuildButtonPressed.bind(this);
        this.handleBudgetChange = this.handleBudgetChange.bind(this);
        this.handleAIOChange = this.handleAIOChange.bind(this);
        this.handleCPUChange = this.handleCPUChange.bind(this);
        this.handleGPUChange = this.handleGPUChange.bind(this);
    }

    handleCPUChange(e){
        this.setState({
            cpu_type: e.target.value,
        });
    }

    handleGPUChange(e){
        this.setState({
            gpu_type: e.target.value,
        });
    }

    handleAIOChange(e){
        this.setState({
            aio_pref: e.target.value,
        });
    }

    handleBudgetChange(e){
        this.setState({
            budget: e.target.value,
        });
    }

    handleBuildButtonPressed(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                budget: this.state.budget,
                cpu_type: this.state.cpu_type,
                gpu_type: this.state.gpu_type,
                aio_pref: this.state.aio_pref,
            }),
        };
        fetch('/api/select', requestOptions).then((response) => response.json()).then((data) => console.log(data));
    }

    render(){
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Select Computer Preferences
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} type="number" defaultValue={this.defaultVotes} inputProps={{min: 1000, style: {textAlign: "center"},}} onChange={this.handleBudgetChange}/>
                        <FormHelperText>
                            <div align="center">Budget</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">CPU Type</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="amd" onChange={this.handleCPUChange}>
                            <FormControlLabel value="amd" control={<Radio color="primary" />} label="AMD" labelPlacement="bottom" />
                            <FormControlLabel value="intel" control={<Radio color="secondary" />} label="Intel" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">GPU Type</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="nvidia" onChange={this.handleGPUChange}>
                            <FormControlLabel value="nvidia" control={<Radio color="primary" />} label="NVIDIA" labelPlacement="bottom" />
                            <FormControlLabel value="amd" control={<Radio color="secondary" />} label="AMD" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Liquid Cooling Preference</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="N" onChange={this.handleAIOChange}>
                            <FormControlLabel value="N" control={<Radio color="primary" />} label="NO" labelPlacement="bottom" />
                            <FormControlLabel value="Y" control={<Radio color="secondary" />} label="YES" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleBuildButtonPressed}>BUILD!</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Go Back</Button>
                </Grid>
            </Grid>
        );
    }
}