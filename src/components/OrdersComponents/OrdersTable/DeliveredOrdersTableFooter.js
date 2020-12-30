import { TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useOrderContext } from '../OrderContext/OrderContext'

export default function DeliveredOrdersTableFooter() {
    const ordersContext = useOrderContext()
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={5} />
                <TableCell >
                    Total
                    </TableCell>
                <TableCell align='right'>
                    RON {ordersContext.revenueByOrderState}
                </TableCell>
            </TableRow>
        </TableHead>
    )
}
