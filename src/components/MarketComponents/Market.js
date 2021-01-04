import { Grid } from '@material-ui/core'
import React from 'react'
import AccordionComponent from '../AuxiliaryComponents/AccordionComponent'
import MarketData from './MarketData'
import UsersMarketRoles from './UsersMarketRoles'

export default function Market() {
    return (
        <Grid container direction='column' spacing={2}>
            <Grid item>
                <AccordionComponent title='Date magazin'>
                    <MarketData />
                </AccordionComponent>
            </Grid>
            <Grid item>
                <AccordionComponent title='Roluri utilizatori'>
                    <UsersMarketRoles />
                </AccordionComponent>
            </Grid>
        </Grid>
    )
}
