import { LinearProgress, Table, TableContainer } from '@material-ui/core'
import React from 'react'
import { isEmpty } from 'react-redux-firebase'
import { useUserContext } from './UserContext/UserContext'
import UsersTableBody from './UsersTableBody'
import UsersTableHead from './UsersTableHead'

export default function UsersTable() {
    const userContext = useUserContext()

    return (
        <>
            <TableContainer >
                <Table>
                    <UsersTableHead />
                    <UsersTableBody />
                </Table>
            </TableContainer>
            { isEmpty(userContext.users) && <LinearProgress />}
        </>
    )
}
