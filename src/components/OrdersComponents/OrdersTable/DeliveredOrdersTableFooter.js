import { TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

export default function DeliveredOrdersTableFooter({ totalPrice }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={5} />
                <TableCell >
                    Total
                    </TableCell>
                <TableCell align='right'>
                    RON {totalPrice.toFixed(2)}
                </TableCell>
            </TableRow>
        </TableHead>
    )
}
