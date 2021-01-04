import { Grid } from '@material-ui/core'
import React from 'react'
import AddUserRole from './AddUserRole'
import RolesTabs from './RolesTabs'
import UsersWithRolesTable from './UsersWithRolesTable'

export default function UsersMarketRoles() {
    return (
        <Grid container direction='column' spacing={4}>
            <Grid item>
                <RolesTabs />
                <UsersWithRolesTable />
            </Grid>
            <Grid item>
                <AddUserRole />
            </Grid>
        </Grid>
    )
}
