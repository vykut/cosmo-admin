import { LinearProgress, Table, TableBody, TableContainer } from '@material-ui/core'
import React from 'react'
import { orderStateTypes } from '../../../utils/utils'
import OrdersTableHead from './OrdersTableHead'
import OrdersTableRow from './OrdersTableRow'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded, populate } from 'react-redux-firebase'
import DeliveredOrdersTableFooter from './DeliveredOrdersTableFooter'

const populates = [
    { child: 'userID', root: 'users', childAlias: 'user' },
    { child: 'addressID', root: 'addresses', childAlias: 'address' },
    { child: 'riderID', root: 'users', childAlias: 'rider' },
]

export default compose(
    firestoreConnect((props) => [
        {
            collection: 'orders',
            where: [['state', '==', props.tab]],
            orderBy: [['createdAt', 'desc']]
        },
        { collection: 'users' },
        { collection: 'addresses' }
    ]),
    connect(({ firestore }, props) => ({
        orders: populate(firestore, 'orders', populates),
    }))
)(OrdersTable)

// export default function OrdersTable({ tab }) {
function OrdersTable({ tab, orders }) {
    return (
        <>
            <TableContainer>
                <Table>
                    <OrdersTableHead showRider={tab === 'pending' ? false : true} />
                    <TableBody>
                        {!isEmpty(orders) && Object.entries(orders).map((order) => {
                            return <OrdersTableRow order={order[1]} id={order[0]} key={order[0]} />
                        })}
                    </TableBody>
                    {tab === 'delivered' && !isEmpty(orders) && <DeliveredOrdersTableFooter totalPrice={Object.entries(orders).reduce((acc, curr) => acc + curr[1].totalPrice, 0)} />}
                </Table>
            </TableContainer>
            {!isLoaded(orders) && <LinearProgress />}
        </>
    )
}
