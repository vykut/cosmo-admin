import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
        height: 320,
        width: 'auto',
    },
    media: {
        height: 100,
        width: 'auto',
        margin: 'auto'
    },
}));

export default function AddProductBox() {
    const classes = useStyles()
    const { categoryID } = useParams()
    const history = useHistory()
    return (
        <Card className={classes.root} elevation={3}>
            <CardActionArea style={{ height: '100%' }} onClick={() => { history.push(`/categorii/${categoryID}/produse/adauga-produs/`) }}>
                <CardContent style={{ height: '100%' }}>
                    <Grid container direction='column' alignItems='center' justify='space-evenly' alignContent='space-around' style={{ height: '100%' }}>
                        <Grid item>
                            <AddCircleOutlineIcon style={{ fontSize: 80 }} color='primary' />
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h6" component="h2" align='center'>
                                Adaugă un produs
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}
