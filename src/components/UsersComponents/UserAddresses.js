import { Button, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { isEmpty, isLoaded, useFirestore } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import AddressForm from './AddressForm'
import { useUserContext } from './UserContext/UserContext'

const initialAddress = {
    apartment: '',
    block: '',
    floor: '',
    intercom: '',
    label: '',
    number: '',
    street: '',
}

export default function UserAddresses() {

    const userContext = useUserContext()
    const [address, setAddress] = useState(initialAddress)
    const [addressID, setAddressID] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { userID } = useParams()
    const firestore = useFirestore()

    const handleSelectChange = (e) => {
        setAddressID(e.target.value)
        switch (e.target.value) {
            case '':
            case -1:
                return setAddress(initialAddress)
            default:
                return setAddress({ ...userContext.userAddresses[e.target.value] })
        }
    }


    const updateAddress = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await firestore.collection('addresses').doc(addressID === -1 ? undefined : addressID).set({
            ...address,
            userID,
        })
        setAddressID('')
        setIsLoading(false)
    }


    return (
        <form onSubmit={updateAddress}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h6' >
                        Adrese de livrare
                    </Typography>
                </Grid>
                <Grid item>
                    <Select
                        value={addressID}
                        onChange={handleSelectChange}
                        displayEmpty
                        variant='outlined'
                        fullWidth
                        required
                        defaultValue='Selectează adresa'
                    >
                        <MenuItem value={''} disabled>Selectează adresa</MenuItem>
                        {!isEmpty(userContext.userAddresses) && Object.entries(userContext.userAddresses).map((address) => <MenuItem value={address[0]} key={address[0]}>
                            {address[1].label}
                        </MenuItem>)}
                        <MenuItem value={-1}>Adresă nouă</MenuItem>
                    </Select>
                    {/* </FormControl> */}
                </Grid>
                {addressID !== '' && <Grid item>

                    <AddressForm address={address} setAddress={setAddress} />

                </Grid>}
                <Grid container item justify='flex-end'>
                    <Grid item>
                        <Button color='primary' type='submit' variant='contained' disabled={isLoading || addressID === ''}>
                            Actualizează adresa
                        </Button>
                    </Grid>
                </Grid>
            </Grid >
        </form>
    )
}
