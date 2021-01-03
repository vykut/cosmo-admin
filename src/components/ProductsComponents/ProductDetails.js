import { Button, FormControlLabel, Grid, Switch, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { isEmpty, useFirebase, useFirestore } from 'react-redux-firebase'
import { useHistory, useParams } from 'react-router-dom'
import { all } from '../../utils/utils'
import { useProductContext } from './ProductContext/ProductContext'
import ProductMarketBox from './ProductMarketBox'

export default function ProductDetails() {
    const { productID, categoryID } = useParams()
    const productContext = useProductContext()
    const { enqueueSnackbar } = useSnackbar()
    const firestore = useFirestore()
    const firebase = useFirebase()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const history = useHistory()

    useEffect(() => {
        if (productID && !isEmpty(productContext.products)) {
            setProduct({ ...productContext.products[productID] })
        }
    }, [productContext.products, productID])

    const validateForm = (product) => {
        if (!product.name || !product.description || !product.price || !product.categories) {
            enqueueSnackbar('Toate câmpurile trebuie completate', { variant: 'error' })
            return false
        }
        if (!product.image && !image) {
            enqueueSnackbar('Produsul trebuie să aibă o imagine', { variant: 'error' })
            return false
        }
        return true
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        const productToBeUpdated = { ...product }
        if (!productToBeUpdated.categories) {
            if (categoryID !== all) {
                productToBeUpdated.categories = [...productContext.categories[categoryID].parentCategories, categoryID]
            }
        }

        if (!validateForm(productToBeUpdated))
            return

        const productRef = firestore.collection('products').doc(productID)



        var downloadURL = ''
        if (image) {
            const storage = firebase.storage()
            const uploaded = await storage.ref(`/products/${image.name}`).put(image)
            downloadURL = await uploaded.ref.getDownloadURL()
            productToBeUpdated.image = downloadURL
        }

        productToBeUpdated.price = parseFloat(product.price)

        await productRef.set({
            ...productToBeUpdated,
            enabled: productToBeUpdated.enabled ? productToBeUpdated.enabled : true,
            stock: productToBeUpdated.stock ? productToBeUpdated.stock : true,
            createdAt: product.createdAt ? product.createdAt : firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })

        enqueueSnackbar('Operațiune realizată cu succes', { variant: 'success' })
        setImage(null)
        setProduct(productToBeUpdated)
        history.push(`/categorii/${productToBeUpdated.categories[productToBeUpdated.categories.length - 1]}/produse/${productRef.id}/detalii`)
    }

    const handleInputImage = (e) => {
        if (e.target.files[0].size > 1024 * 1024 * 3) {
            enqueueSnackbar('Dimensiunea fișierului este prea mare. Aceasta trebuie să fie mai mica de 3MB. Mai taie din ele dă-le drecu', { variant: 'error' })
            e.target.value = product.image
        } else {
            setImage(e.target.files[0])
        }
    }

    if (isEmpty(productContext.categories)) {
        return <> </>
    }

    return (
        <form onSubmit={updateProduct}>
            <Grid container direction='column' spacing={5}>
                <Grid container item justify='space-between' alignItems='center'>
                    <Grid item>
                        <Autocomplete
                            onChange={(e, newVal) => setProduct({
                                ...product,
                                categories: [...newVal.parentCategories, newVal.id],
                            })}
                            options={!isEmpty(productContext.categories) ? Object.entries(productContext.categories).map(category => { return { ...category[1], id: category[0] } }) : []}
                            getOptionLabel={(category) => category.name}
                            getOptionSelected={(option, value) => option.id === value.id}
                            value={!isEmpty(productContext.categories) ? productContext.categories[categoryID] : [{ name: '' }]}
                            style={{ width: 300 }}
                            renderInput={(params) => < TextField {...params}
                                label="Categorie"
                                variant="outlined"
                            />}
                            disableClearable
                        />
                    </Grid>
                    <Grid item>
                        <Typography >
                            ID produs: {productID}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item justify='space-between'>
                    <Grid container item direction='column' spacing={4} xs>
                        <Grid item>
                            <TextField
                                value={product.name || ''}
                                label='Nume'
                                variant='outlined'
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                fullWidth
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                value={product.description || ''}
                                label='Descriere'
                                variant='outlined'
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                fullWidth
                                rows={6}
                                multiline
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid container item justify='space-between'>
                            <Grid item>
                                <TextField
                                    value={product.price || ''}
                                    label='Preț RON'
                                    variant='outlined'
                                    onChange={(e) => {
                                        if (isNaN(e.target.value)) {
                                            enqueueSnackbar('Prețul este incorect', { variant: 'error' })
                                            return
                                        } else {
                                            setProduct({ ...product, price: e.target.value })
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={product.enabled || false}
                                            onChange={() => setProduct({ ...product, enabled: !product.enabled })}
                                            color='primary'
                                        />
                                    }
                                    disabled={isLoading}
                                    label={product.enabled ? 'Activ' : 'Inactiv'}
                                    labelPlacement='top'
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={product.stock || false}
                                            onChange={() => setProduct({ ...product, stock: !product.stock })}
                                            color='primary'
                                        />
                                    }
                                    disabled={isLoading}
                                    label={product.stock ? 'În stoc' : 'Fără stoc'}
                                    labelPlacement='top'
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' component='label' color='secondary' disabled={isLoading}>
                                Schimbă imaginea produsului
                                <input id='image_upload' type='file' name='image' onChange={handleInputImage} accept='image/*' hidden />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant='caption' >
                                {image ? image.name : product.image ? product.image : ''}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='primary' type='submit' disabled={isLoading}>
                                Aplică modificările
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs direction='column' alignItems='center' spacing={4}>
                        <Grid item>
                            <Typography variant='h6'>
                                Așa va arăta produsul în magazinul online
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ProductMarketBox product={product} image={image} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
