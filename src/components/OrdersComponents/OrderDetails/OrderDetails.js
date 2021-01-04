import { Box, Button, ButtonGroup, Grid, LinearProgress, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import OrderHeader from './OrderHeader'
import OrderNotes from './OrderNotes'
import OrderProducts from './OrderProducts'
import OrderCustomerDetails from './OrderCustomerDetails'
import OrderTotal from './OrderTotal'
import { firestoreConnect, isEmpty, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseFunctions } from '../../..'
import { useOrderContext } from '../OrderContext/OrderContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    errorButton: {
        color: theme.palette.error.contrastText,
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.error.main
            }
        }
    },
}))

// const populates = [
//     { child: 'userID', root: 'users', childAlias: 'user' },
//     { child: 'addressID', root: 'addresses', childAlias: 'address' },
//     { child: 'riderID', root: 'users', childAlias: 'rider' },
// ]

// const order = 'order'

// export const OrderDetailsWithRouter = withRouter(compose(
//     firestoreConnect((props) => {
//         return [
//             {
//                 collection: 'orders',
//                 doc: props.match.params.orderID,
//                 storeAs: 'order',
//             },
//             { collection: 'users' },
//             { collection: 'addresses' }
//         ]
//     }),
//     connect(({ firestore }, props) => ({
//         order: populate(firestore, order, populates),
//     }))
// )(OrderDetails))


export default function OrderDetails(props) {
    const classes = useStyles()
    const { orderID } = useParams()
    const orderContext = useOrderContext()

    function OrderActions({ orderID, state }) {
        const classes = useStyles()
        const { enqueueSnackbar } = useSnackbar()
        const functions = firebaseFunctions
        const [isLoading, setIsLoading] = useState(false)
        const acceptOrder = async () => {
            setIsLoading(true)
            functions.httpsCallable('riderFunctions-assignOrder')({ orderID: orderID })
                .then(({ data }) => {
                    setIsLoading(false)
                    if (data.result) {
                        enqueueSnackbar(data.result, { variant: 'success' })
                    } else if (data.error) {
                        enqueueSnackbar(data.error, { variant: 'error' })
                    }
                })
        }

        const completeOrder = async () => {
            setIsLoading(true)
            functions.httpsCallable('riderFunctions-completeOrder')({ orderID: orderID })
                .then(({ data }) => {
                    setIsLoading(false)
                    if (data.result) {
                        enqueueSnackbar(data.result, { variant: 'success' })
                    } else if (data.error) {
                        enqueueSnackbar(data.error, { variant: 'error' })
                    }
                })
        }

        const cancelDelivery = async () => {
            setIsLoading(true)
            functions.httpsCallable('riderFunctions-cancelDelivery')({ orderID: orderID })
                .then(({ data }) => {
                    setIsLoading(false)
                    if (data.result) {
                        enqueueSnackbar(data.result, { variant: 'success' })
                    } else if (data.error) {
                        enqueueSnackbar(data.error, { variant: 'error' })
                    }
                })
        }

        return (
            <Grid container item justify='flex-end' className={classes.paper}>
                {state === 'pending' && <Grid item>
                    <Button onClick={acceptOrder} color='primary' variant='contained' disabled={isLoading}>
                        Acceptă comanda
                    </Button>
                </Grid>}
                {state === 'assigned' &&
                    <Grid item>
                        <ButtonGroup>
                            <Button onClick={cancelDelivery} className={classes.errorButton} variant='contained' disabled={isLoading}>
                                Anulează livrarea
                            </Button>
                            <Button onClick={completeOrder} color='primary' variant='contained' disabled={isLoading}>
                                Finalizează comanda
                            </Button>
                        </ButtonGroup>
                    </Grid>}
                {/* {state === 'delivered' && <Grid item>
                    <Button onClick={acceptOrder} color='primary' variant='contained'>
                        Acceptă comanda
                    </Button>
                </Grid>} */}
            </Grid>
        )
    }

    return (
        <>
            <Grid container direction='column' spacing={4}>
                {!isEmpty(orderContext.order) && <OrderHeader orderID={orderID} timestamp={orderContext.order.createdAt} state={orderContext.order.state} />}
                {!isEmpty(orderContext.order) && <OrderCustomerDetails user={orderContext.order.user} userID={orderContext.order.userID} address={orderContext.order.address} addressID={orderContext.order.addressID} />}
                {<OrderProducts orderID={orderID} />}
                {!isEmpty(orderContext.order) && <OrderNotes notes={orderContext.order.notes} />}
                {!isEmpty(orderContext.order) && <OrderTotal totalPrice={orderContext.order.totalPrice} deliveryPrice={orderContext.order.deliveryPrice || 10} />}
                {/* <OrderActions orderID={orderID} state={order.state} /> */}
                {isEmpty(orderContext.order) && <Grid item><LinearProgress /></Grid>}
            </Grid>
        </>
    )
}


