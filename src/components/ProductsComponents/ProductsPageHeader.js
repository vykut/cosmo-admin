import { Button, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, OutlinedInput, Paper, Select, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'
import { useProductContext } from './ProductContext/ProductContext';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export const useStyles = makeStyles((theme) => ({
    iconButton: {
        marginRight: theme.spacing(1),
        padding: theme.spacing(1, 0),
        minWidth: 50,
        marginLeft: -15,
    },
    input: {
        color: theme.palette.info.main,
    },
    cssLabel: {
        color: theme.palette.info.main,
        "&.Mui-focused": {
            color: theme.palette.info.main
        }
    }
}))

export default function ProductsPageHeader() {
    const classes = useStyles()
    const productContext = useProductContext()
    const [search, setSearch] = useState('')


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const makeQuery = (e) => {
        if ((e.type === 'keyup' && e.key === 'Enter') || e.currentTarget.name === 'search') {
            return productContext.changeNameFilter(search)
        }

    }

    const changeFilterOption = (e) => {
        productContext.changeFilter({
            ...productContext.filter,
            option: e.target.value,
        })
    }

    const changeFilterDirection = (e) => {
        productContext.changeFilter({
            ...productContext.filter,
            ascending: !productContext.filter.ascending,
        })
    }

    return (
        <Paper style={{ padding: 8 }} elevation={3}>
            <Grid container direction='row' justify='space-around' alignContent='center' alignItems='center' spacing={2} >
                <Grid item sm={12} md={6}>
                    <OutlinedInput
                        placeholder='Caută un produs'
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        name='searchQuery'
                        onChange={handleSearch}
                        onKeyUp={makeQuery}
                        value={search}
                        startAdornment={
                            <Button className={classes.iconButton} color='primary' name='search' onClick={makeQuery}>
                                <SearchIcon />
                            </Button>
                        } />
                </Grid>
                <Grid container xs item justify='flex-end' spacing={3} >
                    <Grid item >
                        <FormControl variant='outlined'>
                            <InputLabel id="sort-label" >Sortează</InputLabel>
                            <Select
                                labelId="sort-label"
                                value={productContext.filter.option}
                                name='sort'
                                onChange={changeFilterOption}
                                margin='dense'
                                input={<OutlinedInput notched label='Sortează' />}
                            >
                                <MenuItem value={'createdAt'}>După poziție</MenuItem>
                                <MenuItem value={'price'}>Preț</MenuItem>
                                <MenuItem value={'name'}>Alfabetic</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={changeFilterDirection} color='primary'>
                            {productContext.filter.ascending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}
