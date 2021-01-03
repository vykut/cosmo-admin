import { Button, ButtonGroup, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import { useSelector } from 'react-redux';
import { firebaseFunctions, firestoreDB } from '../..';
import { isEmpty, useFirestore } from 'react-redux-firebase';
import { useUserContext } from './UserContext/UserContext';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(),
    },
    infoTextColor: {
        color: theme.palette.info.main
    },
    infoButtonColor: {
        color: theme.palette.info.contrastText,
        backgroundColor: theme.palette.info.main,
        "&:hover": {
            backgroundColor: theme.palette.info.dark,
            "@media (hover: none)": {
                backgroundColor: theme.palette.info.main
            }
        }
    },
    errorButtonColor: {
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

export default function PersonalData() {
    const classes = useStyles()
    const userContext = useUserContext()
    const firestore = useFirestore()
    const { userID } = useParams()
    // const functions = firebaseFunctions

    const [isLoading, setIsLoading] = useState(false)

    // const [enabled, setEnabled] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (!isEmpty(userContext.user)) {
            setUserData({ ...userContext.user })
        }
    }, [userContext.user])

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value
        })
    }

    const updateUserData = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await firestore.collection('users').doc(userID).update(userData)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={updateUserData}>
            <Grid container direction='column' spacing={2} >
                <Grid item>
                    <Typography variant='h6'>
                        Date personale
                            </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        value={userData.email || ''}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        key='Email'
                        id='email'
                        disabled
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        value={userData.firstName || ''}
                        onChange={handleChange}
                        id="firstName"
                        label="Prenume"
                        variant="outlined"
                        fullWidth
                        key='fname'
                        autoComplete='fname'
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        value={userData.lastName || ''}
                        onChange={handleChange}
                        id="lastName"
                        label="Nume"
                        variant="outlined"
                        fullWidth
                        key='lname'
                        autoComplete='lname'
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        value={userData.phone || ''}
                        onChange={handleChange}
                        id="phone"
                        label="Telefon"
                        variant="outlined"
                        key='phone'
                        autoComplete='tel'
                        disabled={isLoading}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button type='submit' id='update' color='primary' variant='contained' >
                        Actualizează datele
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}