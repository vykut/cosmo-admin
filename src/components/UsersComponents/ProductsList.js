import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { isEmpty } from 'react-redux-firebase'
import ProductBox from '../ProductsComponents/ProductBox'
import { useUserContext } from './UserContext/UserContext'

export default function ProductsList() {
    const userContext = useUserContext()

    if (isEmpty(userContext.user) || isEmpty(userContext.user.products))
        return 'Nu există produse favorite'

    return (
        <Grid container spacing={2} >
            {userContext.user.products.map((product, index) => {
                const productID = userContext.user.favoriteProducts[index]
                return <Grid item key={productID}>
                    <ProductBox product={product} productID={productID} />
                </Grid>
            })}
        </Grid>
    )
}
