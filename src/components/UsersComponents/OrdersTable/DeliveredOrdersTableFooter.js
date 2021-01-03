import { TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { isEmpty } from 'react-redux-firebase'
import { useUserContext } from '../UserContext/UserContext'

export default function DeliveredOrdersTableFooter() {
    const userContext = useUserContext()

    if (isEmpty(userContext.userOrders))
        return null

    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={4} />
                <TableCell >
                    Total
                    </TableCell>
                <TableCell align='right'>
                    RON {userContext.ordersRevenue()}
                </TableCell>
            </TableRow>
        </TableHead>
    )
}
