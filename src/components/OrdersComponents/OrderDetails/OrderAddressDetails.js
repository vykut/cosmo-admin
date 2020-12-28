import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

export default function OrderAddressDetails({ address }) {
    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography component='div' align='right'>
                    <Box fontWeight='fontWeightBold'>
                        Adresă livrare
                        </Box>
                </Typography>
            </Grid>
            <Grid item>
                <Typography align='right'>
                    Strada: {address.street}
                </Typography>
            </Grid>
            {address.number && <Grid item>
                <Typography align='right'>
                    Nr: {address.number}
                </Typography>
            </Grid>}
            {address.block && <Grid item>
                <Typography align='right'>
                    Bloc/ scara: {address.block}
                </Typography>
            </Grid>}
            {address.floor && <Grid item>
                <Typography align='right'>
                    Etaj: {address.floor}
                </Typography>
            </Grid>}
            {address.apartment && <Grid item>
                <Typography align='right'>
                    Apartament: {address.apartment}
                </Typography>
            </Grid>}
            {address.intercom && <Grid item>
                <Typography align='right'>
                    Interfon: {address.intercom}
                </Typography>
            </Grid>}
        </Grid>
    )
}
