import { Grid, TextField } from '@material-ui/core'
import React from 'react'

export default function AddressForm({ address, setAddress }) {

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Grid container direction='column' >
            <>
                <Grid item style={{ paddingTop: 8 }}>
                    <TextField
                        required
                        value={address.street || ''}
                        onChange={handleAddressChange}
                        id="street"
                        label="Strada"
                        variant="outlined"
                        fullWidth key='street'
                        autoComplete='street-address'
                    />
                </Grid>
                <Grid container item style={{ paddingTop: 8 }}>
                    <Grid item xs={6} style={{ paddingTop: 8, paddingBottom: 8, paddingRight: 8 }}>
                        <TextField required value={address.number || ''} onChange={handleAddressChange} id="number" label="Număr" variant="outlined" key='number' fullWidth />
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
                        <TextField value={address.block || ''} id="block" onChange={handleAddressChange} label="Bloc" variant="outlined" key='block' fullWidth />
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 8, paddingBottom: 8, paddingRight: 8 }}>
                        <TextField value={address.floor || ''} id="floor" onChange={handleAddressChange} label="Etaj" variant="outlined" key='floor' fullWidth />
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
                        <TextField value={address.apartment || ''} id="apartment" onChange={handleAddressChange} label="Apartament" variant="outlined" key='apartment' fullWidth />
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 8, paddingBottom: 8, paddingRight: 8 }}>
                        <TextField value={address.intercom || ''} id="intercom" onChange={handleAddressChange} label="Interfon" variant="outlined" key='intercom' fullWidth />
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
                        <TextField value={address.label || ''} onChange={handleAddressChange} required id="label" label="Etichetă" variant="outlined" key='label' fullWidth />
                    </Grid>
                </Grid>
            </>
        </Grid>
    )
}
