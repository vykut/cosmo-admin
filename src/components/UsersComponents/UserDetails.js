import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import OrdersTable from './OrdersTable/OrdersTable'
import PersonalData from './PersonalData'
import ProductsList from './ProductsList'
import UserAddresses from './UserAddresses'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionComponent from '../AuxiliaryComponents/AccordionComponent'

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
                <AccordionComponent expanded={expanded === 'userData'} onChange={expand('userData')} title='Date utilizator'>
                    <Grid container spacing={2}>
                        <Grid item sm>
                            <PersonalData />
                        </Grid>
                        <Grid item sm>
                            <UserAddresses />
                        </Grid>
                    </Grid>
                </AccordionComponent>
            </Grid>
            <Grid item>
                <AccordionComponent expanded={expanded === 'userOrders'} onChange={expand('userOrders')} title='Comenzi efectuate'>
                    <OrdersTable />
                </AccordionComponent>
            </Grid>
            <Grid item>
                <AccordionComponent expanded={expanded === 'userFavoriteProducts'} onChange={expand('userFavoriteProducts')} title='Produse favorite'>
                    <ProductsList />
                </AccordionComponent>
            </Grid>
        </Grid>
    )
}
