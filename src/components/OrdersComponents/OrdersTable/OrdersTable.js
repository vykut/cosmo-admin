import { LinearProgress, Table, TableBody, TableContainer } from '@material-ui/core'
import React from 'react'
import OrdersTableHead from './OrdersTableHead'
import OrdersTableRow from './OrdersTableRow'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import DeliveredOrdersTableFooter from './DeliveredOrdersTableFooter'
import { useOrderContext } from '../OrderContext/OrderContext'

export default function OrdersTable() {
    const orderContext = useOrderContext()

    return (
        <>
            <TableContainer>
                <Table>
                    <OrdersTableHead showRider={orderContext.orderTab === 'pending' ? false : true} />
                    <TableBody>
                        {!isEmpty(orderContext.orders) && Object.entries(orderContext.orders).map((order) => {
                            return <OrdersTableRow order={order[1]} id={order[0]} key={order[0]} />
                        })}
                    </TableBody>
                    {orderContext.orderTab === 'delivered' && !isEmpty(orderContext.orders) && <DeliveredOrdersTableFooter />}
                </Table>
            </TableContainer>
            {!isLoaded(orderContext.orders) && <LinearProgress />}
        </>
    )
}
