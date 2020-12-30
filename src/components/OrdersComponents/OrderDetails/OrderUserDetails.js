import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'

export default function OrderUserDetails({ user, id }) {
    const [userData, setUserData] = useState({ ...user })
    const [isLoading, setIsLoading] = useState(false)
    const firestore = useFirestore()

    const updateUserData = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await firestore.collection('users').doc(id).update(userData)
        setIsLoading(false)
    }

    return (
        <form onSubmit={updateUserData}>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography component='div'>
                        <Box fontWeight='fontWeightBold' display='inline'>
                            Client
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label='Prenume'
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label='Nume'
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label='Telefon'
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item style={{ width: 300 }}>
                    <TextField
                        label='Email'
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        fullWidth
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <Typography>
                        ID client: {id}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
                        Actualizează
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
