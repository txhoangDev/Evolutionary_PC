import React from "react";
import { Grid } from "@mui/material";
import { RegProps } from '../../types';

const RegistrationLayout: React.FC<RegProps> = (RegProps) => {
  return (
    <Grid spacing={9} container>
      <Grid
        item
        container
        xs={12}
        md={6}
      >
        {RegProps.children[0]}
      </Grid>
      <Grid item container xs={12} md={6}>
        {RegProps.children[1]}
      </Grid>
    </Grid>
  );
};

export default RegistrationLayout;
