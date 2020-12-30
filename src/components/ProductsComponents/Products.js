import { Grid } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import CategoriesTree from '../ProductsComponents/CategoriesTree'
import ProductDetails from './ProductDetails'
import ProductsList from './ProductsList'

export default function Products() {
    const { productID } = useParams()

    return (
        <Grid container spacing={4}>
            <Grid item sm={3} xs={12}>
                <CategoriesTree />
            </Grid>
            <Grid item sm={9} xs={12}>
                {productID ? <ProductDetails /> : <ProductsList />}
            </Grid>
        </Grid>
    )
}
