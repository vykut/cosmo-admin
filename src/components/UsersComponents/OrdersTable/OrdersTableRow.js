import { IconButton, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { useHistory } from "react-router-dom";

export default function OrdersTableRow({ id, order }) {
    const history = useHistory()

    const orderClicked = () => {
        history.push(`/comenzi/${id}/detalii`)
    }

    return (
        <>
            <TableRow
                key={id}
                hover
                onClick={orderClicked}
            >
                <TableCell>
                    {new Date(order.createdAt.seconds * 1000).toLocaleString('ro-RO')}
                </TableCell>
                <TableCell>
                    {id}
                </TableCell>
                <TableCell>
                    {order.address ? order.address.street : order.addressID}
                </TableCell>
                {order.state !== 'pending' && <TableCell>
                    {order.rider ? `${order.rider.firstName}  ${order.rider.lastName}` : order.riderID}
                </TableCell>}
                <TableCell align='right'>
                    {order.quantity}
                </TableCell>
                <TableCell align='right'>
                    RON {order.totalPrice.toFixed(2)}
                </TableCell>
            </TableRow>
        </>
    )
}
