// DISPLAYS CARDS WITH GLOBAL DATA

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { fetchGlobalData } from '../../api';
import cx from 'classnames';    //used to style each card
import styles from './Cards.module.css';
import numeral from "numeral";

const Cards = () => {

    const [globalData, setGlobalData] = useState({});

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialCountryData = await fetchGlobalData();
            setGlobalData(initialCountryData);
        };

        fetchMyAPI();
    }, []);

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.confirmed)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Confirmed (Global)</Typography>
                        <Typography variant="h5"><b>{numeral(globalData.cases).format("0,0")}</b></Typography>
                        <Typography variant="body2">Number of confirmed cases of Covid-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.active)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Active (Global)</Typography>
                        <Typography variant="h5"><b>{numeral(globalData.active).format("0,0")}</b></Typography>
                        <Typography variant="body2">Number of active cases of Covid-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered (Global)</Typography>
                        <Typography variant="h5"><b>{numeral(globalData.recovered).format("0,0")}</b></Typography>
                        <Typography variant="body2">Number of recoveries from Covid-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths (Global)</Typography>
                        <Typography variant="h5"><b>{numeral(globalData.deaths).format("0,0")}</b></Typography>
                        <Typography variant="body2">Number of deaths by Covid-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;