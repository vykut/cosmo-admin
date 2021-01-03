import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import OrdersTable from './OrdersTable/OrdersTable'
import PersonalData from './PersonalData'
import ProductsList from './ProductsList'
import UserAddresses from './UserAddresses'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    accordion: {
        borderStyle: 'solid',
        borderColor: '#e0e0e3',
        borderWidth: '1px',
    }
}))

export default function UserDetails() {
    const classes = useStyles()
    const [expanded, setExpanded] = useState('userData')

    const expand = (accordion) => () => {
        if (expanded === accordion)
            setExpanded('')
        else
            setExpanded(accordion)
    }

    return (
        <Grid container direction='column' spacing={4}>
            <Grid item>
                <Accordion elevation={0} expanded={expanded === 'userData'} onChange={expand('userData')} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h6'>
                            Date utilizator
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item sm>
                                <PersonalData />
                            </Grid>
                            <Grid item sm>
                                <UserAddresses />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item>
                <Accordion elevation={0} expanded={expanded === 'userOrders'} onChange={expand('userOrders')} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h6'>
                            Comenzi efectuate
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OrdersTable />
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item>
                <Accordion elevation={0} expanded={expanded === 'userFavoriteProducts'} onChange={expand('userFavoriteProducts')} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h6'>
                            Produse favorite
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ProductsList />
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}
