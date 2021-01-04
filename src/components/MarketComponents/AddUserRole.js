import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useMarketContext } from './MarketContext/MarketContext'

export default function AddUserRole() {
    const marketContext = useMarketContext()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const firestore = useFirestore()
    const { enqueueSnackbar } = useSnackbar()

    const addRole = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const user = await firestore.collection('users').where('email', '==', email.toLowerCase()).limit(1).get()
            if (user.docs[0]) {
                await user.docs[0].ref.update({ role: marketContext.role })
            } else {
                enqueueSnackbar('Utilizatorul nu a fost găsit', { variant: 'error' })
            }
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={addRole}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography>
                        Adaugă un {marketContext.role === 'admin' ? 'administrator' : 'livrator'}
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant='outlined'
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={isLoading}
                    >
                        Adaugă
                </Button>
                </Grid>
                <Grid item>
                    <Typography variant='caption'>
                        Pentru a putea atribui un rol, utilizatorul trebuie să aibă cont în magazinul online. Pentru a se conecta fie ca livrator sau ca admin, acesta folosește același email și aceeași parolă ca în magazinul online.
                    </Typography>
                </Grid>
            </Grid>
        </form>
    )
}
