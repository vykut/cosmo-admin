
import { Box, Button, CircularProgress, Grid, InputAdornment, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded, populate, useFirebase, useFirestore } from 'react-redux-firebase'
import { compose } from 'redux'
import { useOrderContext } from '../OrderContext/OrderContext'
import OrderProductsTableRow from './OrderProductsTableRow'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router-dom'


// const productsInOrder = 'productsInOrder'

// export default compose(
//     firestoreConnect((props) => [
//         { collection: 'orders' },
//         {
//             collection: 'orders',
//             doc: props.orderID,
//             subcollections: [{ collection: 'products' }],
//             storeAs: productsInOrder
//         },
//     ]),
//     connect(({ firestore }, props) => ({
//         productsInOrder: firestore.data.productsInOrder,
//     }))
// )(OrderProducts)


export default function OrderProducts() {
    const orderContext = useOrderContext()
    const firestore = useFirestore()
    const firebase = useFirebase()
    const { orderID } = useParams()

    const addProductToOrder = (e, newVal) => {
        if (newVal)
            firestore.collection('orders').doc(orderID).collection('products').doc(newVal[0]).set({
                quantity: firebase.firestore.FieldValue.increment(1),
                price: firebase.firestore.FieldValue.increment(newVal[1].price)
            }, { merge: true })
    }

    return (
        <>
            <Grid container item direction='column' spacing={1}>
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
                                    <TableCell colSpan={2}>
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
                                {!isEmpty(orderContext.productsInOrder) && Object.entries(orderContext.productsInOrder).map((product, index) => {
                                    return !isEmpty(product[1]) && <OrderProductsTableRow productInOrder={product} key={product[0]} />
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    {!isLoaded(orderContext.productsInOrder) && <LinearProgress />}
                </Grid>
                <Grid item>
                    <Autocomplete
                        onChange={addProductToOrder}
                        options={!isEmpty(orderContext.products) ? Object.entries(orderContext.products) : []}
                        getOptionLabel={(product) => product[1].name}
                        getOptionSelected={(option, value) => option.name === value.name}
                        style={{ width: 300 }}
                        renderInput={(params) => < TextField {...params}
                            label="Adaugă produs"
                            variant="outlined"
                        />}
                    />
                </Grid>
            </Grid>
        </>
    )
}