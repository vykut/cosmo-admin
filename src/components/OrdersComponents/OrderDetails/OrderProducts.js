
import { Box, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import OrderProductsTableRow from './OrderProductsTableRow'

const productsInOrder = 'productsInOrder'

export default compose(
    firestoreConnect((props) => [
        { collection: 'orders' },
        {
            collection: 'orders',
            doc: props.orderID,
            subcollections: [{ collection: 'products' }],
            storeAs: productsInOrder
        },
    ]),
    connect(({ firestore }, props) => ({
        productsInOrder: firestore.data.productsInOrder,
    }))
)(OrderProducts)


function OrderProducts({ productsInOrder }) {
    return (
        <>
            <Grid container item direction='column'>
                <Grid item >
                    <Typography component='div'>
                        <Box fontWeight='fontWeightBold'>
                            Produse
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Produs
                                    </TableCell>
                                    <TableCell align='right'>
                                        Preț bucată
                                    </TableCell>
                                    <TableCell align='right'>
                                        Cantitate
                                    </TableCell>
                                    <TableCell align='right'>
                                        Preț total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isEmpty(productsInOrder) && Object.entries(productsInOrder).map((product, index) => {
                                    return <OrderProductsTableRow productInOrder={product} key={product[0]} />
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    {!isLoaded(productsInOrder) && <LinearProgress />}
                </Grid>
            </Grid>
        </>
    )
}