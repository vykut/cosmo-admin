import { TableBody, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { isEmpty } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import { useUserContext } from './UserContext/UserContext'

export default function UsersTableBody() {
    const userContext = useUserContext()
    const history = useHistory()

    if (isEmpty(userContext.users))
        return null

    return (
        <>
            <TableBody>
                {Object.entries(userContext.users).map((user => {
                    return <TableRow key={user[0]} onClick={() => history.push(`/utilizatori/${user[0]}/detalii/`)} hover>
                        <TableCell >
                            {user[0]}
                        </TableCell>
                        <TableCell>
                            {user[1].email}
                        </TableCell>
                        <TableCell>
                            {`${user[1].firstName} ${user[1].lastName}`}
                        </TableCell>
                        <TableCell>
                            {user[1].phone}
                        </TableCell>
                        <TableCell align='right'>
                            {user[1].numberOfOrdersCompleted}
                        </TableCell>
                    </TableRow>
                }))}
            </TableBody>
        </>
    )
}
