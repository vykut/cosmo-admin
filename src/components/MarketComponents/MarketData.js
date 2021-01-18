import { Button, Grid, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { isEmpty, isLoaded, useFirestore } from 'react-redux-firebase'
import { useMarketContext } from './MarketContext/MarketContext'

export default function MarketData() {
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
                <Grid container item spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Orar în timpul săptămânii'
                            value={marketData.weekTimeTable || ''}
                            onChange={(e) => setMarketData({ ...marketData, weekTimeTable: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Orar în weekend'
                            value={marketData.weekendTimeTable || ''}
                            onChange={(e) => setMarketData({ ...marketData, weekendTimeTable: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>
                </Grid>
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
            </Grid>
        </form>
    )
}
