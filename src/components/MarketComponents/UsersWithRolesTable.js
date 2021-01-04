import { Table, TableBody, TableContainer, TableHead } from '@material-ui/core'
import React from 'react'
import UsersWithRolesTableBody from './UsersWithRolesTableBody'
import UsersWithRolesTableHead from './UsersWithRolesTableHead'

export default function UsersWithRolesTable() {
    return (
        <TableContainer>
            <Table>
                <UsersWithRolesTableHead />
                <UsersWithRolesTableBody />
            </Table>
        </TableContainer>
    )
}
