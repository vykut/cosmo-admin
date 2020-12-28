import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

export default function OrderUserDetails({ user }) {
    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography component='div'>
                    <Box fontWeight='fontWeightBold'>
                        Client
                            </Box>
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {`${user.firstName} ${user.lastName}`}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Telefon: {user.phone}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Email: {user.email}
                </Typography>
            </Grid>
        </Grid>
    )
}
