import { Button, Checkbox, Grid, IconButton, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { isEmpty, useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useParams } from 'react-router-dom'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        color: theme.palette.error.main
    },
}))

export default function OrderProductsTableRow({ productInOrder }) {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const { orderID } = useParams()
    const firestore = useFirestore()
    useFirestoreConnect(() => [
        { collection: 'products', doc: productInOrder[0] } // or `todos/${props.todoId}`
    ])

    const product = useSelector(
        ({ firestore: { data } }) => data.products && data.products[productInOrder[0]]
    )

    const removeProductFromOrder = async () => {
        setIsLoading(true)
        await firestore.collection('orders').doc(orderID).collection('products').doc(productInOrder[0]).delete()
    }

    function QuantitySelector() {
        const { orderID } = useParams()
        const firestore = useFirestore()
        const firebase = useFirebase()
        const [isLoading, setIsLoading] = useState(false)

        const decrementQuantity = async () => {
            const price = productInOrder[1].price / productInOrder[1].quantity
            setIsLoading(true)
            if (productInOrder[1].quantity > 1)
                await firestore.collection('orders').doc(orderID).collection('products').doc(productInOrder[0]).update({ quantity: firebase.firestore.FieldValue.increment(-1), price: firebase.firestore.FieldValue.increment(-price) })
            setIsLoading(false)
        }

        const incrementQuantity = async () => {
            const price = productInOrder[1].price / productInOrder[1].quantity
            setIsLoading(true)
            if (productInOrder[1].quantity < 20)
                await firestore.collection('orders').doc(orderID).collection('products').doc(productInOrder[0]).update({ quantity: firebase.firestore.FieldValue.increment(1), price: firebase.firestore.FieldValue.increment(price) })
            setIsLoading(false)
        }

        return (
            <>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <IconButton
                            size='small'
                            onClick={decrementQuantity}
                            disabled={isLoading}
                        >
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {!isEmpty(productInOrder[1]) && productInOrder[1].quantity}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            size='small'
                            onClick={incrementQuantity}
                            disabled={isLoading}
                        >
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <TableRow key={productInOrder[0]} hover>
            <TableCell>
                <IconButton
                    className={classes.deleteButton}
                    size='small'
                    onClick={removeProductFromOrder}
                    disabled={isLoading}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                {isEmpty(product) ? productInOrder[0] : product.name}
            </TableCell>
            <TableCell align='right'>
                RON {isEmpty(product) ? productInOrder[1].price.toFixed(2) : product.price.toFixed(2)}
            </TableCell>
            <TableCell align='right'>
                <QuantitySelector />
            </TableCell>
            <TableCell align='right'>
                RON {!isEmpty(productInOrder[1]) && productInOrder[1].price.toFixed(2)}
            </TableCell>
        </TableRow>
    )
}
