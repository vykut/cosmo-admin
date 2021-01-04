import { Tab, Tabs } from '@material-ui/core'
import React from 'react'
import { orderStateTypes } from '../../utils/utils'
import { useOrderContext } from './OrderContext/OrderContext'
import OrdersTable from './OrdersTable/OrdersTable'

export default function Orders() {
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
