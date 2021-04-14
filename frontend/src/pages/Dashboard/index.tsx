import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dashboardContainer: {
    display: 'flex',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.dashboardContainer}>
      <Typography variant="h2">Hello FE</Typography>
    </Grid>
  );
};

export default Dashboard;
