import { LinearProgress, Table, TableBody, TableContainer } from '@material-ui/core'
import React from 'react'
import { orderStateTypes } from '../../../utils/utils'
import OrdersTableHead from './OrdersTableHead'
import OrdersTableRow from './OrdersTableRow'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded, populate } from 'react-redux-firebase'
import DeliveredOrdersTableFooter from './DeliveredOrdersTableFooter'
import { useOrderContext } from '../OrderContext/OrderContext'

const populates = [
    { child: 'userID', root: 'users', childAlias: 'user' },
    { child: 'addressID', root: 'addresses', childAlias: 'address' },
    { child: 'riderID', root: 'users', childAlias: 'rider' },
]

// export default compose(
//     firestoreConnect((props) => [
//         {
//             collection: 'orders',
//             where: [['state', '==', props.tab]],
//             orderBy: [['createdAt', 'desc']]
//         },
//         { collection: 'users' },
//         { collection: 'addresses' }
//     ]),
//     connect(({ firestore }, props) => ({
//         orders: populate(firestore, 'orders', populates),
//     }))
// )(OrdersTable)

// export default function OrdersTable({ tab }) {
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
