import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { useMarketContext } from './MarketContext/MarketContext';

const headCells = [
    { id: 'id', numeric: false, label: 'Cod utilizator' },
    { id: 'email', numeric: false, label: 'Email client' },
    { id: 'lastName', numeric: false, label: 'Nume Client' },
    { id: 'phone', numeric: false, label: 'Telefon client' },
];

export default function UsersWithRolesTableHead() {
    const marketContext = useMarketContext()

    const orderBy = marketContext.orderBy
    const direction = marketContext.direction

    const sort = (id) => {
        marketContext.sort(id)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {
                    return <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? direction : false}
                        colSpan={headCell.id === 'id' ? 2 : 1}
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
