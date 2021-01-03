import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react'

const headCells = [
    { id: 'createdAt', numeric: false, label: 'Dată' },
    { id: 'id', numeric: false, label: 'Cod comandă' },
    { id: 'address', numeric: false, label: 'Adresă' },
    { id: 'rider', numeric: false, label: 'Livrată de' },
    { id: 'quantity', numeric: true, label: 'Număr produse' },
    { id: 'totalPrice', numeric: true, label: 'Total' },
];

export default function OrdersTableHead({ showRider = true }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((cell) => {
                    if (cell.id === 'rider' && !showRider)
                        return null
                    return <TableCell
                        key={cell.id}
                        align={cell.numeric ? 'right' : 'left'}
                    >
                        {cell.label}
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    )
}
