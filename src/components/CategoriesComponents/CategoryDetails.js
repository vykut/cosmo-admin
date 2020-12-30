import { Box, Button, FormControlLabel, Grid, makeStyles, Popover, Switch, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { isEmpty, useFirestore } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { useCategoryContext } from './CategoryContext/CategoryContext'

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        // margin: theme.spacing(3, 0, 2),
        color: theme.palette.error.contrastText,
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.error.main
            }
        }
    },
    popover: {
        padding: theme.spacing(2)
    }
}))

export default function CategoryDetails() {
    const classes = useStyles()
    const { categoryID } = useParams()
    const categoryContext = useCategoryContext()
    const firestore = useFirestore()
    const [categoryName, setCategoryName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        if (categoryID && !isEmpty(categoryContext.categories)) {
            setCategoryName(categoryContext.categories[categoryID].name)
        }
    }, [categoryContext.categories, categoryID])

    const deleteCategory = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const toggleCategory = async (e) => {
        setIsLoading(true)
        await firestore.collection('categories').doc(categoryID).update({ enabled: e.target.checked })
        setIsLoading(false)
    }

    const updateCategoryName = async () => {
        setIsLoading(true)
        await firestore.collection('categories').doc(categoryID).update({ name: categoryName })
        setIsLoading(false)
    }

    if (!categoryID) {
        return (
            <Typography component='div' variant='h6'>
                <Box fontWeight='fontWeightBold'>
                    Selectează o categorie
                </Box>
            </Typography>
        )
    }

    return (
        <Grid container direction='column' spacing={5} alignItems='center'>
            <Grid item>
                <TextField
                    label='Denumire'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={isLoading}
                    style={{ width: 350 }}
                    variant='outlined'
                />
            </Grid>
            <Grid item>
                <Button
                    onClick={updateCategoryName}
                    variant='contained'
                    color='primary'
                    disabled={isLoading}
                >
                    Actualizează
                </Button>
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Switch
                            checked={!isEmpty(categoryContext.categories) ? categoryContext.categories[categoryID].enabled : true}
                            onChange={toggleCategory}
                            color='primary'
                        />
                    }
                    disabled={isLoading}
                    label={!isEmpty(categoryContext.categories) && categoryContext.categories[categoryID].enabled ? 'Activă' : 'Inactivă'}
                />
            </Grid>
            <Grid container item direction='column' spacing={1} alignItems='center'>
                <Grid item>
                    <Button
                        onClick={deleteCategory}
                        variant='contained'
                        className={classes.deleteButton}
                    >
                        Șterge categoria
                </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                    >
                        <Typography variant='subtitle2' align='center' color='error' style={{ width: 300 }} className={classes.popover}>
                            Întrucât ștergerea unei categorii este o operațiune ireversibilă și atrage după sine ștergerea tuturor subcategoriilor și a tuturor produselor acesteia, numai tehnicianul bazei de date poate recurge la această operațiune. Pentru a ascunde o categorie, vă sfătuim să o dezactivați.
                        </Typography>
                    </Popover>
                </Grid>
            </Grid>
        </Grid>
    )
}
