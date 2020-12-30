import { Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { orderStateTypes } from '../../utils/utils'
import { OrderProvider, useOrderContext } from './OrderContext/OrderContext'
import OrdersTable from './OrdersTable/OrdersTable'


export default function OrdersWithStore() {
    return (
        <OrderProvider>
            <Orders />
        </OrderProvider>
    )
}

function Orders() {
    const orderContext = useOrderContext()

    const changeTab = (e, newValue) => {
        orderContext.changeOrderTab(newValue)
    }

    return (
        <>
            <Tabs value={orderContext.orderTab} onChange={changeTab} variant='fullWidth' indicatorColor='primary'>
                {orderStateTypes.map((type) => {
                    return <Tab value={type.state} label={type.name} key={type.state} />
                })}
            </Tabs>
            <OrdersTable />
        </>
    )
}
