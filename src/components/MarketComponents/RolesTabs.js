import { Tab, Tabs } from '@material-ui/core'
import React from 'react'
import { useMarketContext } from './MarketContext/MarketContext'

export default function RolesTabs() {
    const marketContext = useMarketContext()

    const changeRoleTab = (e, newValue) => {
        marketContext.changeRole(newValue)
    }

    return (
        <Tabs value={marketContext.role} onChange={changeRoleTab} variant='fullWidth' indicatorColor='primary'>
            <Tab value='rider' label='Livratori' />
            <Tab value='admin' label='Administratori' />
        </Tabs>
    )
}
