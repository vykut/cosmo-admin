import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { isEmpty, useFirebase, useFirestore } from 'react-redux-firebase'
import { useHistory, useParams } from 'react-router-dom'
import { useCategoryContext } from './CategoryContext/CategoryContext'

export default function CategoryCreator() {

    const categoryContext = useCategoryContext()
    const { categoryID } = useParams()
    const firestore = useFirestore()
    const firebase = useFirebase()
    const history = useHistory()
    const [categoryName, setCategoryName] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const { enqueueSnackbar } = useSnackbar()

    const addCategory = async () => {
        setIsLoading(true)
        const newDocRef = firestore.collection('categories').doc()
        const parentCategoryRef = firestore.collection('categories').doc(categoryID)
        const batch = firestore.batch()
        batch.set(newDocRef, {
            childrenCategories: [],
            enabled: true,
            name: categoryName,
            parentCategories: [...categoryContext.categories[categoryID].parentCategories, categoryID],
        })
        batch.update(parentCategoryRef, {
            childrenCategories: firebase.firestore.FieldValue.arrayUnion(newDocRef.id)
        })
        await batch.commit()
        setIsLoading(false)
        history.push(`/categorii/${newDocRef.id}/detalii/`)
    }

    const addMainCategory = async () => {
        try {
            setIsLoading(true)
            const newDocRef = firestore.collection('categories').doc()
            await newDocRef.set({
                childrenCategories: [],
                enabled: true,
                name: categoryName,
                parentCategories: [],
                mainCategory: true,
            })
            setIsLoading(false)
            history.push(`/categorii/${newDocRef.id}/detalii/`)
        } catch (err) {
            console.log(err)
            enqueueSnackbar('Eroare la crearea categoriei.', { variant: 'error' })
            setIsLoading(false)
        }
    }

    return (
        <Grid container direction='column' alignItems='center' spacing={4}>
            {categoryID && <Grid item>
                <Typography component='div' variant='h6'>
                    {'Categoria părinte: '}
                    {!isEmpty(categoryContext.categories) && <Box display='inline' fontWeight='fontWeightBold' color='text.primary'>
                        {categoryContext.categories[categoryID].name}
                    </Box>}
                </Typography>
            </Grid>}
            <Grid item>
                <TextField
                    label='Denumire'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={isLoading || isEmpty(categoryContext.categories)}
                    variant='outlined'
                />
            </Grid>
            <Grid item>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={isLoading || !categoryName}
                        onClick={categoryID ? addCategory : addMainCategory}
                    >
                        Salvează
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
