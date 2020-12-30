import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'

export default function OrderAddressDetails({ address, id }) {
    const [addressData, setAddressData] = useState({ ...address })
    const [isLoading, setIsLoading] = useState(false)
    const firestore = useFirestore()

    const updateAddressData = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await firestore.collection('addresses').doc(id).update(addressData)
        setIsLoading(false)
    }

    return (
        <form onSubmit={updateAddressData}>
            <Grid container direction='column' spacing={1} alignItems='flex-end'>
                <Grid item>
                    <Typography component='div' align='right'>
                        <Box fontWeight='fontWeightBold'>
                            Adresă livrare
                    </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label='Strada'
                        value={addressData.street}
                        onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                        disabled={isLoading}
                        style={{ width: 392 }}
                    />
                </Grid>
                <Grid container item justify='space-between' style={{ width: 400 }} alignItems='center'>
                    <Grid item>
                        <TextField
                            label='Număr'
                            value={addressData.number}
                            onChange={(e) => setAddressData({ ...addressData, number: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Bloc/ Scară'
                            value={addressData.block}
                            onChange={(e) => setAddressData({ ...addressData, block: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify='space-between' style={{ width: 400 }} alignItems='center'>
                    <Grid item>
                        <TextField
                            label='Etaj'
                            value={addressData.floor}
                            onChange={(e) => setAddressData({ ...addressData, floor: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Apartament'
                            value={addressData.apartment}
                            onChange={(e) => setAddressData({ ...addressData, apartment: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>

                </Grid>
                <Grid container item justify='space-between' style={{ width: 400 }} alignItems='center'>

                    <Grid item>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={isLoading}
                        >
                            Actualizează
                                </Button>
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Interfon'
                            value={addressData.intercom}
                            onChange={(e) => setAddressData({ ...addressData, intercom: e.target.value })}
                            disabled={isLoading}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography align='right'>
                        ID adresă: {id}
                    </Typography>
                </Grid>
            </Grid>
        </form>
    )
}
