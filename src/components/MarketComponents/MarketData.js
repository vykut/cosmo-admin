import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { isEmpty, isLoaded, useFirestore } from 'react-redux-firebase'
import { useMarketContext } from './MarketContext/MarketContext'

const useStyles = makeStyles((theme) => ({
    deactivateButton: {
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
}))

export default function MarketData() {

    const classes = useStyles()
    const marketContext = useMarketContext()
    const [marketData, setMarketData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const firestore = useFirestore()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (!isEmpty(marketContext.market)) {
            setMarketData(marketContext.market)
        }
    }, [marketContext.market])

    const updateMarket = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await firestore.collection('stores').doc('CosmoMarket').update(marketData)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const enableStore = async (enable) => {
        try {
            setIsLoading(true)
            await firestore.collection('stores').doc('CosmoMarket').update({ isDisabled: !enable, isOpen: enable })
            enqueueSnackbar('S-au actualizat datele', { variant: 'success' })
        } catch (err) {
            enqueueSnackbar('Datele nu au putut fi actualizate', { variant: 'error' })
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isLoaded(marketContext.market))
        return null


    return (
        <form onSubmit={updateMarket}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Nume magazin'
                        value={marketData.name || ''}
                        onChange={(e) => setMarketData({ ...marketData, name: e.target.value })}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Telefon magazin'
                        value={marketData.phone || ''}
                        onChange={(e) => setMarketData({ ...marketData, phone: e.target.value })}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Adresă magazin'
                        value={marketData.address || ''}
                        onChange={(e) => setMarketData({ ...marketData, address: e.target.value })}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Preț livrare RON'
                        value={marketData.deliveryPrice || ''}
                        onChange={(e) => {
                            if (isNaN(e.target.value)) {
                                enqueueSnackbar('Prețul este incorect', { variant: 'error' })
                                return
                            } else {
                                setMarketData({ ...marketData, deliveryPrice: parseFloat(e.target.value) })
                            }
                        }}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <Typography>
                        Orar în timpul săptămânii (L - V)
                    </Typography>
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Oră deschidere magazin'
                            value={marketData.openHour || ''}
                            onChange={(e) => {
                                if (isNaN(e.target.value)) {
                                    enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                    return
                                } else {
                                    const hour = parseInt(e.target.value)
                                    if (hour < 0 || hour > 23)
                                        enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                    else
                                        setMarketData({ ...marketData, openHour: hour || 0 })
                                }
                            }}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Oră închidere magazin'
                            value={marketData.closeHour || ''}
                            onChange={(e) => {
                                if (isNaN(e.target.value)) {
                                    enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                    return
                                } else {
                                    const hour = parseInt(e.target.value)
                                    if (hour < 0 || hour > 23)
                                        enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                    else
                                        setMarketData({ ...marketData, closeHour: hour || 0 })
                                }
                            }}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item>
                        <Typography>
                            Orar în weekend (S - D)
                        </Typography>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Oră deschidere magazin'
                                value={marketData.weekendOpenHour || ''}
                                onChange={(e) => {
                                    if (isNaN(e.target.value)) {
                                        enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                        return
                                    } else {
                                        const hour = parseInt(e.target.value)
                                        if (hour < 0 || hour > 23)
                                            enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                        else
                                            setMarketData({ ...marketData, weekendOpenHour: hour || 0 })
                                    }
                                }}
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Oră închidere magazin'
                                value={marketData.weekendCloseHour || ''}
                                onChange={(e) => {
                                    if (isNaN(e.target.value)) {
                                        enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                        return
                                    } else {
                                        const hour = parseInt(e.target.value)
                                        if (hour < 0 || hour > 23)
                                            enqueueSnackbar('Ora este incorectă', { variant: 'error' })
                                        else
                                            setMarketData({ ...marketData, weekendCloseHour: hour || 0 })
                                    }
                                }}
                                disabled={isLoading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justify='space-between'>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isLoading}
                        >
                            Actualizează
                    </Button>
                    </Grid>
                    <Grid item>
                        {!marketData.isDisabled ? <Button
                            variant='contained'
                            className={classes.deactivateButton}
                            disabled={isLoading}
                            onClick={() => enableStore(false)}
                        >
                            Dezactivează magazinul
                            </Button>
                            :
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={isLoading}
                                onClick={() => enableStore(true)}
                            >
                                Reactivează magazinul
                    </Button>}
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
