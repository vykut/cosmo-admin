import { Grid, makeStyles, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDashboardContext } from './DashboardContext/DashboardContext'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        borderStyle: 'solid',
        borderColor: '#e0e0e3',
        borderWidth: '1px',
    }
}))

export default function IncomeSituation() {
    const classes = useStyles()
    const dashboardContext = useDashboardContext()

    const [tab, setTab] = useState(1)

    const changeTab = (e, newValue) => {
        setTab(newValue)
        dashboardContext.changePeriod(newValue)
    }

    return (
        <Paper elevation={0} className={classes.container} >
            <Typography variant='h6'>
                Situația veniturilor în ultima perioadă de timp
            </Typography>
            <Grid container direction='column' spacing={4}>
                <Grid item>
                    <Tabs value={tab} onChange={changeTab} variant='fullWidth' indicatorColor='primary'>
                        <Tab value={1} label='O zi' />
                        <Tab value={7} label='7 zile' />
                        <Tab value={30} label='30 de zile' />
                    </Tabs>
                </Grid>
                <Grid item>
                    <Typography variant='h4' align='center'>
                        RON {dashboardContext.income.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
