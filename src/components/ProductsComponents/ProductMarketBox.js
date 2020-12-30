import { Badge, Box, Button, fade, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { firebaseFunctions } from "../..";
import { useProductContext } from "./ProductContext/ProductContext";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useEffect, useState } from "react";


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        maxWidth: 200,
    },
    container: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    quantitySelector: {
        borderRadius: 5,
        border: 1,
        borderStyle: 'solid',
        display: 'flex',
        alignContent: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        height: 30,
    },
    quantityTypography: {
        maxWidth: 180,
        marginBottom: theme.spacing(1)
    },
    quantityIncrement: {
        borderLeft: 1,
        borderColor: theme.palette.info.main,
        borderStyle: 'solid',
        borderRadius: 0,
    },
    quantityDecrement: {
        borderRight: 1,
        borderColor: theme.palette.info.main,
        borderStyle: 'solid',
        borderRadius: 0,
    },
    quantityInput: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 50,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginBottom: theme.spacing(3),
        // maxHeight: 100,
        // maxWidth: 100,
        width: 'auto',
        height: 100,
        margin: 'auto',
    },
    favorite: {
        color: theme.palette.error.main,
        "&:hover": {
            backgroundColor: fade(theme.palette.error.main, theme.palette.action.hoverOpacity),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        }
    }
}));

export default function ProductMarketBox({ product, image }) {
    const classes = useStyles()
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        if (image) {
            const imageURL = URL.createObjectURL(image)
            setImageURL(imageURL)

            return () => URL.revokeObjectURL(imageURL)
        }
    }, [image])

    if (!product) {
        return <> </>
    }

    return (
        <>
            <Paper className={classes.paper} elevation={3}>
                <Badge badgeContent={
                    <IconButton className={classes.favorite} >
                        <FavoriteBorderIcon color='error' />
                    </IconButton>
                }>
                    <div className={classes.container}>
                        <img className={classes.image} src={image ? imageURL : product.image} alt={product.name} />
                        <Typography color='primary' align='center' style={{ maxWidth: 200, height: 48 }} >
                            {product.name}
                        </Typography>
                    </div>
                </Badge>
                <div className={classes.paper} style={{ padding: 10 }}>
                    <Typography className={classes.quantityTypography} variant='button'>
                        Cantitate
                        </Typography>
                    <div className={classes.quantitySelector}>
                        <IconButton
                            className={classes.quantityDecrement}
                            id='decrement'
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography
                            className={classes.quantityInput}
                            align='center'
                            variant='h6'
                        >
                            1
                        </Typography>
                        <IconButton
                            className={classes.quantityIncrement}
                            id='increment'
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
                <Typography variant='h6' color='error' style={{ marginBottom: 10 }}>
                    <Box fontWeight='fontWeightBold'>
                        {product.price} RON
                    </Box>
                </Typography>
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<ShoppingCartIcon />}
                >
                    Adaugă în coș
                    </Button>
            </Paper>
        </>
    )
}