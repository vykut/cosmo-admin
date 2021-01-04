import { Grid } from '@material-ui/core'
import React from 'react'
import IncomeSituation from './IncomeSituation'

export default function Dashboard() {
    return (
        <Grid container>
            <Grid item>
                <IncomeSituation />
            </Grid>
        </Grid>
    )
}
