import { Grid, LinearProgress, Table, TableBody, TableContainer, Typography } from '@material-ui/core'
import React from 'react'
import OrdersTableHead from './OrdersTableHead'
import OrdersTableRow from './OrdersTableRow'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import DeliveredOrdersTableFooter from './DeliveredOrdersTableFooter'
import { useUserContext } from '../UserContext/UserContext'

export default function OrdersTable() {
    const userContext = useUserContext()

    return (
        <>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <TableContainer>
                        <Table>
                            <OrdersTableHead showRider={true} />
                            <TableBody>
                                {!isEmpty(userContext.userOrders) ? Object.entries(userContext.userOrders).filter((order) => order[1].state === 'delivered').map((order) => {
                                    return <OrdersTableRow order={order[1]} id={order[0]} key={order[0]} />
                                }) : 'Nu există comenzi'}
                            </TableBody>
                            <DeliveredOrdersTableFooter />
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    {!isLoaded(userContext.userOrders) && <LinearProgress />}
                </Grid>
            </Grid>
        </>
    )
}
