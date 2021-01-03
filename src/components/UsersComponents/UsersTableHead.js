import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { useUserContext } from './UserContext/UserContext';

const headCells = [
    { id: 'id', numeric: false, label: 'Cod utilizator' },
    { id: 'email', numeric: false, label: 'Email client' },
    { id: 'lastName', numeric: false, label: 'Nume Client' },
    { id: 'phone', numeric: false, label: 'Telefon client' },
    { id: 'numberOfOrdersCompleted', numeric: true, label: 'Număr comenzi efectuate' },
];

export default function UsersTableHead() {
    const userContext = useUserContext()

    const orderBy = userContext.orderBy
    const direction = userContext.direction

    const sort = (id) => {
        userContext.sort(id)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {
                    return <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? direction : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? direction : 'asc'}
                            onClick={() => sort(headCell.id)}
                            disabled={headCell.id === 'id'}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    )
}
