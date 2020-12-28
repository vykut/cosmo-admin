import { Button, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { connect, useSelector } from 'react-redux'
import { isEmpty, useFirestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

export default function OrderProductsTableRow({ productInOrder }) {



    useFirestoreConnect(() => [
        { collection: 'products', doc: productInOrder[0] } // or `todos/${props.todoId}`
    ])

    const product = useSelector(
        ({ firestore: { data } }) => data.products && data.products[productInOrder[0]]
    )

    return (
        <TableRow key={productInOrder[0]}>
            <TableCell>
                {/* <Button style={{ textTransform: 'none' }} color='primary' onClick={() => dialog.showDialog(product.id)}> */}
                {isEmpty(product) ? productInOrder[0] : product.name}
                {/* </Button> */}
            </TableCell>
            <TableCell align='right'>
                RON {isEmpty(product) ? productInOrder[1].price.toFixed(2) : product.price.toFixed(2)}
            </TableCell>
            <TableCell align='right'>
                {productInOrder[1].quantity}
            </TableCell>
            <TableCell align='right'>
                RON {productInOrder[1].price.toFixed(2)}
            </TableCell>
        </TableRow>
    )
}
