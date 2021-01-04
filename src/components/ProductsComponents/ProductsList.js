import { Grid } from '@material-ui/core'
import React, { useCallback } from 'react'
import { isEmpty } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { all } from '../../utils/utils'
import AddProductBox from './AddProductBox'
import ProductBox from './ProductBox'
import { useProductContext } from './ProductContext/ProductContext'
import ProductsPageHeader from './ProductsPageHeader'

export default function ProductsList() {
    const productContext = useProductContext()

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item>
                <ProductsPageHeader />
            </Grid>
            <Grid container item spacing={2} justify='space-around' style={{ width: 'auto' }}>
                <Grid item>
                    <AddProductBox />
                </Grid>
                {!isEmpty(productContext.getProducts()) && productContext.getProducts().map((product, index) => {
                    return <Grid item key={product[0]}>
                        <ProductBox product={product[1]} productID={product[0]} />
                    </Grid>
                }
                )}
            </Grid>
        </Grid>
    )
}
