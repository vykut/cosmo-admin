import { Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { orderStateTypes } from '../../utils/utils'
import OrdersTable from './OrdersTable/OrdersTable'

export default function Orders() {
    const [tab, setTab] = useState(orderStateTypes[0].state)

    const changeTab = (e, newValue) => {
        setTab(newValue)
    }

    return (
        <>
            <Tabs value={tab} onChange={changeTab} variant='fullWidth' indicatorColor='primary'>
                {orderStateTypes.map((type) => {
                    return <Tab value={type.state} label={type.name} key={type.state} />
                })}
            </Tabs>
            <OrdersTable tab={tab} />
        </>
    )
}
