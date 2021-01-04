import { IconButton, Link, makeStyles, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { isEmpty } from 'react-redux-firebase'
import { useMarketContext } from './MarketContext/MarketContext'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        color: theme.palette.error.main
    },
}))

export default function UsersWithRolesTableBody() {
    const classes = useStyles()
    const marketContext = useMarketContext()
    const [isLoading, setIsLoading] = useState(false)

    const removeUserRole = (userID) => async () => {
        setIsLoading(true)
        try {
            await marketContext.removeUserRole(userID)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isEmpty(marketContext.usersWithRoles))
        return 'Nu există înregistrări'

    return (
        <TableBody>
            {Object.entries(marketContext.usersWithRoles).filter(user => user[1]).map((user) => {
                return <TableRow hover key={user[0]}>
                    <TableCell>
                        <IconButton className={classes.deleteButton} onClick={removeUserRole(user[0])} disabled={isLoading}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <Link component={RouterLink} to={`/utilizatori/${user[0]}/detalii/`}>
                            {user[0]}
                        </Link>
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
                </TableRow>
            })}
        </TableBody>
    )
}
