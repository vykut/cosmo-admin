import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { isLoaded, useFirestore } from "react-redux-firebase";
import { useParams } from "react-router-dom";

export default function OrderNotes({ notes }) {
    const [notesData, setNotesData] = useState(notes)
    const [isLoading, setIsLoading] = useState(false)
    const { orderID } = useParams()
    const firestore = useFirestore()

    const updateUserData = async (e) => {
        setIsLoading(true)
        await firestore.collection('orders').doc(orderID).update({ notes: notesData })
        setIsLoading(false)
    }
    return (
        <>
            <Grid container item direction='column' spacing={2}>
                <Grid item >
                    <Typography component='div'>
                        <Box fontWeight='fontWeightBold'>
                            Note
                        </Box>
                    </Typography>
                </Grid>
                <Grid item >
                    <TextField
                        multiline
                        rows={4}
                        value={notesData}
                        onChange={(e) => setNotesData(e.target.value)}
                        disabled={isLoading}
                        variant='outlined'
                    />
                </Grid>
                <Grid item >
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={updateUserData}
                        disabled={isLoading}
                    >
                        Actualizează
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}