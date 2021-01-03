import { Grid } from '@material-ui/core'
import React from 'react'
import UsersTable from './UsersTable'

export default function Users() {
    return (
        <Grid container direction='column'>
            <UsersTable />
        </Grid>
    )
}
