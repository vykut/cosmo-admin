import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControlLabel, makeStyles, Switch, Typography } from '@material-ui/core';
import React, { memo, useMemo, useState } from 'react'
import { useFirestore } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import { useProductContext } from './ProductContext/ProductContext';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
        height: 320,
    },
    media: {
        maxHeight: 100,
        maxWidth: '100%',
        width: 'auto',
        margin: 'auto',
        padding: theme.spacing(),
    },
}));

export default memo(ProductBox)

function ProductBox({ product, productID }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const firestore = useFirestore()
    const history = useHistory()
    const { categoryID } = useParams()
    const productContext = useProductContext()

    const toggleProductEnabled = async () => {
        setIsLoading(true)
        await firestore.collection('products').doc(productID).update({
            enabled: !product.enabled
        })
        setIsLoading(false)
    }

    const toggleProductStock = async () => {
        setIsLoading(true)
        await firestore.collection('products').doc(productID).update({
            stock: !product.stock
        })
        setIsLoading(false)
    }

    const goToProduct = () => {
        const productCategories = productContext.products[productID].categories
        const lastCategory = productCategories[productCategories.length - 1]
        history.push(`/categorii/${lastCategory}/produse/${productID}/detalii`)
    }

    return (
        <Card className={classes.root} elevation={3}>
            <CardActionArea onClick={goToProduct}>
                <CardMedia
                    className={classes.media}
                    component='img'
                    src={product.image}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" align='center'>
                        {product.name}
                    </Typography>
                    <Typography align='center'>
                        Preț {product.price} RON
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <FormControlLabel
                    control={
                        <Switch
                            checked={product.enabled}
                            onChange={toggleProductEnabled}
                            color='primary'
                        />
                    }
                    disabled={isLoading}
                    label={product.enabled ? 'Activ' : 'Inactiv'}
                    labelPlacement='top'
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={product.stock}
                            onChange={toggleProductStock}
                            color='primary'
                        />
                    }
                    disabled={isLoading}
                    label={product.stock ? 'În stoc' : 'Fără stoc'}
                    labelPlacement='top'
                />
            </CardActions>
        </Card>
    );
}
